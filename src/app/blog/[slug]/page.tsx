import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import { redirect } from "next/navigation";

// 1. The GROQ Query: This asks Sanity for the specific post matching the URL slug
const query = `*[_type == "post" && slug.current == $slug][0] {
  title,
  "date": publishedAt,
  "category": categories[0]->title,
  "image": mainImage.asset->url,
  body,
  externalLink,
  "pdfUrl": articleDocument.asset->url
}`;

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  // 2. Fetch the live data from the database!
  const post = await client.fetch(query, { slug: resolvedParams.slug });

  // 3. If no post is found in the database, show the error UI
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
        <h1 className="text-3xl font-bold text-brand-blue mb-4">Article Not Found</h1>
        <p className="text-gray-600 mb-8">The article you are looking for doesn't exist or has been moved.</p>
        <Link href="/blog" className="bg-brand-pink text-white px-8 py-3 rounded-md font-bold hover:bg-brand-blue transition-colors">
          &larr; Back to Blog
        </Link>
      </div>
    );
  }

  // 4. SMART ROUTING: If she provided a LinkedIn link but no article body, redirect them instantly!
  if (post.externalLink && !post.body) {
    redirect(post.externalLink);
  }

  // Format the date so it looks nice (e.g., "August 28, 2026")
  const formattedDate = post.date 
    ? new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : '';

  return (
    <div className="min-h-screen bg-white">
      {/* Article Header */}
      <header className="bg-brand-blue pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          
          <Link href="/blog" className="inline-flex items-center gap-2 text-brand-pink hover:text-white transition-colors font-semibold mb-8 group">
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to All Insights
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-sm font-bold uppercase tracking-wider mb-6">
            {post.category && (
              <span className="bg-brand-pink text-white px-3 py-1 rounded-full">{post.category}</span>
            )}
            <span className="text-gray-300">{formattedDate}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-8">
            {post.title}
          </h1>

          {/* SMART UI: If she uploaded a PDF, show a download button in the header! */}
          {post.pdfUrl && (
            <a 
              href={post.pdfUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-brand-blue px-6 py-3 rounded-md font-bold hover:bg-brand-pink hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              Download Full Document
            </a>
          )}
        </div>
      </header>

      {/* Featured Image */}
      {post.image && (
        <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-10">
          <div className="w-full h-[300px] md:h-[500px] relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <Image 
              src={post.image} 
              alt={post.title} 
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </div>
      )}

      {/* Article Body using Sanity's PortableText component */}
      <article className="py-16 px-6 max-w-3xl mx-auto">
        <div className="prose prose-lg md:prose-xl prose-blue max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
          {post.body ? (
            <PortableText value={post.body} />
          ) : (
             <p className="italic text-gray-500">No article text provided.</p>
          )}
        </div>
      </article>

      {/* Footer CTA */}
      <section className="bg-gray-50 py-16 px-6 border-t border-gray-200 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-brand-blue mb-4">Want to discuss this further?</h3>
          <p className="text-gray-600 mb-8">Dr. Dets is available for speaking engagements and policy consultations.</p>
          <Link href="/contact" className="inline-block bg-brand-pink text-brand-blue font-bold px-8 py-3 rounded-md hover:bg-brand-blue hover:text-white transition-colors">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}