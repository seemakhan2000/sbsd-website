const extractFAQAnswer = (content = "") => {
  const text = String(content).trim();

  if (!text) return "";

  const match = text.match(
    /^\s*Answer:\s*([\s\S]*?)(?=\n\s*Official\s*Source\s*:|(?![\s\S]))/im
  );

  if (match?.[1]?.trim()) {
    return match[1].trim();
  }

  // Remove metadata while retaining the actual document content.
  return text
    .replace(/^\s*Question:\s*.*$/gim, "")
    .replace(/^\s*Official\s*Source\s*:.*$/gim, "")
    .replace(/https?:\/\/\S+/gim, "")
    .trim();
};
const validateSourceUrl = (value) => {
  if (!value) return null;

  try {
    const url = new URL(value);

    const allowedHosts = [
      "sbsd.virginia.gov",
      "www.sbsd.virginia.gov",
    ];

    if (
      url.protocol !== "https:" ||
      !allowedHosts.includes(url.hostname)
    ) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
};

const fallbackResponse = () => ({
  text:
    "I couldn't find sufficiently relevant information in the official Virginia SBSD knowledge base to answer your question accurately. Please visit https://sbsd.virginia.gov/ for official assistance.",
  sources: [],
  found: false,
});

export const generateAIResponse = async ({
  question,
  context = [],
  history = [],
}) => {
  if (!Array.isArray(context) || !context.length) {
    return fallbackResponse();
  }

  // The highest-ranked document is the authoritative answer.
  const selectedDocument = context[0];

  const answer = extractFAQAnswer(
    selectedDocument.content
  );

  if (!answer) {
    return fallbackResponse();
  }

  const sourceUrl = validateSourceUrl(
    selectedDocument.sourceUrl
  );

  const sources = sourceUrl
    ? [{
        title: selectedDocument.title || "Official SBSD Source",
        url: sourceUrl,
      }]
    : [];

  return {
    text: answer,
    sources,
    found: true,
    confidence: selectedDocument.confidence ?? 0,
    matchedDocument: selectedDocument.title,
  };
};
