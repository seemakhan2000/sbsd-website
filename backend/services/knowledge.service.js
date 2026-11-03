
import KnowledgeBase from "../models/KnowledgeBase.js";

const STOP_WORDS = new Set([
  "what", "is", "the", "a", "an", "and", "or", "of",
  "to", "for", "in", "on", "at", "how", "can", "do",
  "does", "did", "i", "you", "me", "your", "with",
  "about", "tell", "please", "explain", "are", "be",
  "my", "it", "this", "that", "from", "which", "who",
  "would", "could", "should", "we", "our", "their",
  "they", "have", "has", "had", "was", "were",
  "will", "may", "might", "want", "need", "information",
  "stand", "stands", "for", "the"
]);

const SYNONYMS = {
  loan: ["loans", "financing", "funding", "credit"],
  loans: ["loan", "financing", "funding", "credit"],
  financing: ["loan", "loans", "funding", "credit"],
  funding: ["financing", "loan", "capital"],
  credit: ["loan", "financing", "credit support"],
  qualify: ["qualification", "eligibility", "eligible", "requirements"],
  eligibility: ["qualify", "eligible", "requirements"],
  requirements: ["eligibility", "criteria", "qualify"],
  apply: ["application", "applying", "submit"],
  application: ["apply", "applying", "submit"],
  certification: ["certifications", "certified", "swam", "dbe"],
  certifications: ["certification", "swam", "dbe"],
  swam: ["small", "women", "minority", "certification"],
  dbe: ["disadvantaged", "business", "enterprise"],
  business: ["company", "enterprise", "small business"],
  assistance: ["support", "help", "services"],
  support: ["assistance", "help", "services"],
  meaning: ["definition", "abbreviation", "stands"],
  means: ["meaning", "definition", "abbreviation", "stands"],
  definition: ["meaning", "means", "stands"],
  programs: ["program", "services", "initiatives"],
  program: ["programs", "services", "initiatives"],
  sbsd: ["virginia", "small", "business", "supplier", "diversity"],
  vsbfa: ["financing", "authority", "loan", "credit"],
};

// Handle common concatenated or misspelled acronym questions.
const normalizeInput = (value = "") => {
  let text = String(value).toLowerCase();

  text = text
    .replace(/sbsdmenas/g, "sbsd means")
    .replace(/sbsdmeans/g, "sbsd means")
    .replace(/sbsdmeaning/g, "sbsd meaning")
    .replace(/vsbfameans/g, "vsbfa means");

  return text
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const tokenize = (value = "") =>
  normalizeInput(value)
    .split(" ")
    .filter(
      (word) =>
        word.length > 1 &&
        !STOP_WORDS.has(word)
    );

const expandTokens = (tokens = []) => {
  const expanded = new Set(tokens);

  for (const token of tokens) {
    for (const synonym of SYNONYMS[token] || []) {
      for (const word of tokenize(synonym)) {
        expanded.add(word);
      }
    }
  }

  return [...expanded];
};

// Simple typo-tolerant matching without external dependencies.
const levenshteinDistance = (a, b) => {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const previous = Array.from(
    { length: b.length + 1 },
    (_, i) => i
  );

  for (let i = 1; i <= a.length; i++) {
    let diagonal = previous[0];
    previous[0] = i;

    for (let j = 1; j <= b.length; j++) {
      const above = previous[j];

      previous[j] = Math.min(
        previous[j] + 1,
        previous[j - 1] + 1,
        diagonal + (a[i - 1] === b[j - 1] ? 0 : 1)
      );

      diagonal = above;
    }
  }

  return previous[b.length];
};

const tokenMatches = (queryToken, documentTokens) => {
  if (documentTokens.includes(queryToken)) return true;

  if (queryToken.length < 4) return false;

  return documentTokens.some((word) => {
    if (word.length < 4) return false;

    const maxDistance =
      queryToken.length >= 7 ? 2 : 1;

    return (
      levenshteinDistance(queryToken, word) <= maxDistance
    );
  });
};

const extractFAQQuestion = (content = "") => {
  const match = String(content).match(
    /^\s*Question:\s*(.+)$/im
  );

  return match?.[1]
    ? normalizeInput(match[1])
    : "";
};

const getDocumentFields = (document) => {
  const title = normalizeInput(document.title || "");
  const content = normalizeInput(document.content || "");
  const category = normalizeInput(document.category || "");

  const keywords = (document.keywords || [])
    .map(normalizeInput);

  const faqQuestion = extractFAQQuestion(
    document.content || ""
  );

  return {
    title,
    content,
    category,
    keywords,
    faqQuestion,
    titleTokens: tokenize(title),
    contentTokens: tokenize(content),
    keywordTokens: keywords.flatMap(tokenize),
    categoryTokens: tokenize(category),
    faqTokens: tokenize(faqQuestion),
  };
};

const calculateScore = (document, question) => {
  const normalizedQuestion = normalizeInput(question);
  const originalTokens = tokenize(normalizedQuestion);
  const expandedTokens = expandTokens(originalTokens);

  const fields = getDocumentFields(document);

  const {
    title,
    faqQuestion,
    titleTokens,
    contentTokens,
    keywordTokens,
    categoryTokens,
    faqTokens,
  } = fields;

  if (
    faqQuestion &&
    faqQuestion === normalizedQuestion
  ) {
    return {
      score: 1000,
      confidence: 1,
      exactMatch: true,
      matchedWords: originalTokens.length,
    };
  }

  if (
    title === normalizedQuestion ||
    title === `faq ${normalizedQuestion}`
  ) {
    return {
      score: 950,
      confidence: 1,
      exactMatch: true,
      matchedWords: originalTokens.length,
    };
  }

  let score = 0;
  let matchedWords = 0;

  for (const token of originalTokens) {
    let matched = false;

    if (tokenMatches(token, titleTokens)) {
      score += 15;
      matched = true;
    }

    if (tokenMatches(token, faqTokens)) {
      score += 12;
      matched = true;
    }

    if (tokenMatches(token, keywordTokens)) {
      score += 10;
      matched = true;
    }

    if (tokenMatches(token, categoryTokens)) {
      score += 5;
      matched = true;
    }

    if (tokenMatches(token, contentTokens)) {
      score += 2;
      matched = true;
    }

    if (matched) matchedWords++;
  }

  // Synonym matches add relevance, but don't inflate coverage.
  for (const token of expandedTokens) {
    if (originalTokens.includes(token)) continue;

    if (
      tokenMatches(token, titleTokens) ||
      tokenMatches(token, faqTokens)
    ) {
      score += 3;
    } else if (
      tokenMatches(token, keywordTokens)
    ) {
      score += 2;
    }
  }

  const coverage = originalTokens.length
    ? matchedWords / originalTokens.length
    : 0;

  score += coverage * 20;

  // Phrase match.
  if (
    normalizedQuestion.length > 5 &&
    (
      title.includes(normalizedQuestion) ||
      faqQuestion.includes(normalizedQuestion)
    )
  ) {
    score += 30;
  }

  const confidence = Math.min(
    coverage * 0.75 +
      (score >= 20 ? 0.15 : 0) +
      (score >= 40 ? 0.10 : 0),
    1
  );

  return {
    score,
    confidence,
    exactMatch: false,
    matchedWords,
    coverage,
  };
};

export const searchKnowledgeBase = async (
  question,
  options = {}
) => {
  const {
    limit = 5,
    minScore = 12,
    minConfidence = 0.20,
  } = options;

  const normalizedQuestion = normalizeInput(question);
  const tokens = tokenize(normalizedQuestion);

  if (!normalizedQuestion || !tokens.length) {
    return [];
  }

  const documents = await KnowledgeBase.find({
    isActive: true,
  })
    .select("title content category sourceUrl keywords")
    .lean();

  const results = documents
    .map((document) => ({
      ...document,
      ...calculateScore(document, normalizedQuestion),
    }))
    .filter((document) => (
      document.exactMatch ||
      (
        document.score >= minScore &&
        document.confidence >= minConfidence &&
        document.matchedWords >= 1
      )
    ))
    .sort((a, b) => {
      if (a.exactMatch !== b.exactMatch) {
        return a.exactMatch ? -1 : 1;
      }

      return b.score - a.score;
    });

  // Remove duplicate content.
  const uniqueResults = [];
  const seen = new Set();

  for (const result of results) {
    const key = normalizeInput(
      result.content || result.title
    );

    if (seen.has(key)) continue;

    seen.add(key);
    uniqueResults.push(result);

    if (uniqueResults.length >= limit) break;
  }

  return uniqueResults;
};
