
import { MissionData} from "../data/home.data";
import { mediaAssets } from "../constants/media";

export default function Mission() {
    const { title, description, cta } =  MissionData.mission;
    const { poster } = mediaAssets.mission;
    const { sbsdLogo } = mediaAssets;

    return (
       <section className="bg-slate-50 pt-16 sm:pt-32 pb-6 sm:pb-16 overflow-hidden">
            <div className="mx-auto  max-w-[1500px] px-6 lg:px-8">
                {/* Section Header and Content */}
                <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-12">

                    {/* Mission Content Card */}
                    <div className="group relative flex flex-col justify-center overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl sm:p-10 lg:p-12">

                        {/* Brand Accent */}
                        <div
                            aria-hidden="true"
                            className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800"
                        />

                        {/* Content */}
                        <div className="mb-6">
                            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-blue-900">
                                <span
                                    aria-hidden="true"
                                    className="h-1.5 w-1.5 rounded-full bg-blue-900"
                                />
                                Who We Are
                            </span>

                            <h2
                                id="mission-heading"
                                className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-[2.75rem]"
                            >
                                {title}
                            </h2>
                        </div>

                        <p className="mb-9 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                            {description}
                        </p>

                        {/* Call to Action */}
                        <div className="mt-auto">
                            <a
                                href={cta.href}
                                className="group/btn inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-lg bg-blue-950 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 sm:w-fit sm:px-7 sm:text-base"
                            >
                                <span>{cta.text}</span>

                                <svg
                                    aria-hidden="true"
                                    className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover/btn:translate-x-1 motion-reduce:transition-none"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Image Card */}
                    <div className="group relative isolate min-h-[360px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-sm sm:min-h-[440px] lg:min-h-[500px]">

                        {/* Background Image */}
                        <img
                            src={poster}
                            alt="Small business owner welcoming customers"
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                        />

                        {/* Subtle Image Overlay */}
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/5 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                        />

                        {/* Brand Logo */}
                        <div className="absolute bottom-4 right-4 flex items-center justify-center rounded-xl border border-white/70 bg-white/95 p-3 shadow-md backdrop-blur-sm transition-shadow duration-300 group-hover:shadow-lg sm:bottom-6 sm:right-6">
                            <img
                                src={sbsdLogo}
                                alt="SBSD logo"
                                className="h-9 w-auto max-w-[140px] object-contain sm:h-11"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
