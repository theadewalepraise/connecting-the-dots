import type { Metadata } from "next";
import Link from "next/link";

const title = "Career Lighthouse | Connecting the Dots";
const description = "A framework for systemic employability infrastructure in Africa. Watch the Career Lighthouse concept presentation.";
const url = "https://detounogwo.com/projects/career-lighthouse";
const thumbnail = `${url}/thumbnail`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title,
    description,
    siteName: "Connecting the Dots",
    images: [{ url: thumbnail, width: 1200, height: 630, alt: "Career Lighthouse — a framework for systemic employability infrastructure in Africa" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [thumbnail],
  },
};

export default function CareerLighthousePage() {
  return (
    <div className="min-h-screen bg-brand-white">
      <section className="bg-brand-blue px-6 py-16 text-brand-white md:py-24">
        <div className="mx-auto max-w-5xl">
          <Link href="/work-and-impact" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white hover:underline">
            <span aria-hidden="true">←</span> Work &amp; Impact
          </Link>
          <p className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-pink-300">Project overview</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">Career Lighthouse</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/85 md:text-2xl">
            A framework for systemic employability infrastructure in Africa.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-6 py-12 md:py-16" aria-labelledby="presentation">
        <h2 id="presentation" className="mb-5 text-2xl font-bold text-brand-blue md:text-3xl">The Career Lighthouse Concept</h2>
        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-black shadow-lg">
          <video controls playsInline preload="metadata" poster="/projects/career-lighthouse/thumbnail" className="aspect-video w-full object-contain" aria-label="Career Lighthouse concept presentation">
            <source src="/career-lighthouse.mp4.mp4" type="video/mp4" />
            Your browser does not support video playback.
            <a href="/career-lighthouse.mp4.mp4">Open the video file</a>.
          </video>
        </div>
        <p className="mt-3 text-sm text-stone-600">Select play and ensure your sound is on to hear the narration.</p>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-stone-700">
          Explore the Career Lighthouse concept and its approach to connecting people, skills and economic opportunity through the presentation above.
        </p>
        <Link href="/work-and-impact" className="mt-8 inline-flex rounded-md border border-brand-blue px-5 py-3 font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-brand-white">
          Explore more work and impact
        </Link>
      </section>
    </div>
  );
}
