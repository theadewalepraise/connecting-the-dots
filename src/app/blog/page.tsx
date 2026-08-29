"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { client } from "@/sanity/lib/client";

// Define the shape of our post data so TypeScript is happy
interface Post {
  id: string;
  isFeatured: boolean;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  link: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const POSTS_PER_PAGE = 6;
  const gridRef = useRef<HTMLDivElement>(null); 

  // Fetch posts from Sanity when the page loads
  useEffect(() => {
    const fetchPosts = async () => {
      // GROQ query to grab all posts, ordered by newest first
      const query = `*[_type == "post"] | order(publishedAt desc) {
        "id": _id,
        title,
        excerpt,
        isFeatured,
        "date": publishedAt,
        "category": categories[0]->title,
        "image": mainImage.asset->url,
        externalLink,
        "slug": slug.current
      }`;

      const data = await client.fetch(query);

      // Format the data to match our frontend UI
      const formattedPosts = data.map((post: any) => ({
        id: post.id,
        isFeatured: post.isFeatured || false,
        title: post.title || "Untitled Insight",
        excerpt: post.excerpt || "Click to read the full insight.",
        date: post.date ? new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '',
        category: post.category || "Thought Leadership",
        image: post.image || "/Detoun-Ogwo.jpg", // Fallback to her profile if no image uploaded
        // SMART ROUTING: If she provided an external link, the card goes there. Otherwise, it goes to the internal article page.
        link: post.externalLink ? post.externalLink : `/blog/${post.slug}`
      }));

      setPosts(formattedPosts);
      setIsLoading(false);
    };

    fetchPosts();
  }, []);
  
  // Wait for data to load before doing math
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-white">
        <div className="animate-pulse text-brand-blue font-bold text-xl tracking-widest uppercase">
          Loading Insights...
        </div>
      </div>
    );
  }

  // If there are literally 0 posts in the database yet
  if (posts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-white px-6">
        <h2 className="text-3xl font-bold text-brand-blue mb-4">Insights Coming Soon</h2>
        <p className="text-gray-500 text-lg">Dr. Detoun Ogwo will be publishing new articles shortly.</p>
      </div>
    );
  }

  // Isolate the featured post (Find the one marked true, or just use the newest one if none are marked)
  const featuredPost = posts.find(post => post.isFeatured) || posts[0];
  
  // Filter out the featured post to get our regular grid posts
  const regularPosts = posts.filter(post => post.id !== featuredPost.id);
  
  // Calculate pagination boundaries for expanded state
  const totalPages = Math.ceil(regularPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  
  // If expanded, show 6 posts based on pagination. If not, show only the first 3.
  const displayedPosts = isExpanded 
    ? regularPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)
    : regularPosts.slice(0, 3);

  // Handle page changes and scroll back to the top of the grid
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    if (gridRef.current) {
      const yOffset = -100; 
      const element = gridRef.current;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    setCurrentPage(1); 
    if (gridRef.current && isExpanded) {
      const yOffset = -100; 
      const element = gridRef.current;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Determine if the link is external to open in a new tab
  const isExternal = (url: string) => url.startsWith('http');

  return (
    <div className="flex flex-col min-h-screen bg-brand-white">
      
      {/* Hero Section */}
      <section className="bg-brand-blue text-brand-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal delay={0}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Thoughts & Perspectives</h1>
          </ScrollReveal>
          
          <ScrollReveal delay={150}>
            <p className="text-xl text-brand-pink font-light max-w-2xl mx-auto">
              Explorations, research, and reflections on creating a more equitable global workforce.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-24 px-6 max-w-6xl mx-auto w-full">
        
        {/* Featured Article */}
        <div className="mb-16">
          <ScrollReveal delay={0}>
            <h2 className="text-2xl font-bold text-gray-400 uppercase tracking-widest mb-8 text-center md:text-left">
              Featured Insight
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={150}>
            <Link 
              href={featuredPost.link} 
              target={isExternal(featuredPost.link) ? "_blank" : "_self"}
              className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden shadow-sm md:hover:shadow-[0_20px_50px_-12px_rgba(179,0,89,0.15)] md:hover:border-brand-pink/30 md:hover:-translate-y-2 active:scale-[0.98] active:bg-gray-50 transition-all duration-500 group flex flex-col md:flex-row cursor-pointer block"
            >
              <div className="w-full md:w-1/2 min-h-[300px] md:min-h-[400px] relative overflow-hidden bg-gray-100">
                <div className="absolute inset-0">
                  <Image 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
              
              <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-wider mb-4">
                  <span className="bg-brand-pink text-white px-3 py-1 rounded-full text-xs">{featuredPost.category}</span>
                  <span className="text-gray-500">{featuredPost.date}</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:group-hover:text-brand-pink transition-colors duration-300 leading-tight">
                  {featuredPost.title}
                </h3>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {featuredPost.excerpt}
                </p>
                
                <div className="inline-flex items-center gap-2 text-brand-blue font-bold md:group-hover:text-brand-pink transition-colors duration-300 w-fit">
                  Read Full Article
                  <svg className="w-5 h-5 transform md:group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        </div>

        {/* Recent Articles Grid & Pagination */}
        {regularPosts.length > 0 && (
          <div ref={gridRef} className="border-t border-gray-200 pt-16 scroll-mt-24">
            <ScrollReveal delay={0}>
              <div className="flex justify-between items-end mb-10">
                <h2 className="text-2xl font-bold text-brand-blue text-center md:text-left">
                  Recent Publications
                </h2>
              </div>
            </ScrollReveal>
            
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayedPosts.map((post, index) => (
                <ScrollReveal delay={index * 100} key={`${post.id}-${isExpanded ? currentPage : 'preview'}`}>
                  <Link 
                    href={post.link} 
                    target={isExternal(post.link) ? "_blank" : "_self"}
                    className="bg-white border border-gray-200 p-8 rounded-xl md:hover:shadow-[0_15px_40px_-10px_rgba(179,0,89,0.12)] md:hover:-translate-y-2 md:hover:border-brand-pink/30 active:scale-[0.98] active:bg-gray-50 transition-all duration-500 group flex flex-col h-full cursor-pointer block"
                  >
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider mb-4">
                      <span className="bg-brand-pink text-white px-3 py-1 rounded-full">{post.category}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 md:group-hover:text-brand-pink transition-colors duration-300">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-4 mt-auto">
                      <span className="text-gray-500">{post.date}</span>
                      <span className="text-brand-blue font-medium md:group-hover:text-brand-pink transition-colors flex items-center gap-1">
                        {isExternal(post.link) ? 'Read on LinkedIn' : 'Read Article'} &rarr;
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            {/* Dynamic Controls based on isExpanded */}
            {regularPosts.length > 3 && (
              <ScrollReveal delay={0}>
                <div className="mt-16 flex flex-col items-center gap-8">
                  {/* Pagination Controls */}
                  {isExpanded && totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2">
                      <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 md:hover:bg-gray-50 md:hover:text-brand-blue active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`w-10 h-10 flex items-center justify-center rounded-md font-bold transition-all active:scale-95 ${
                            currentPage === page 
                              ? "bg-brand-blue text-white shadow-md border-brand-blue" 
                              : "border border-gray-200 text-gray-600 md:hover:bg-gray-50 md:hover:text-brand-blue"
                          }`}
                        >
                          {page}
                        </button>
                      ))}

                      <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 md:hover:bg-gray-50 md:hover:text-brand-blue active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                      </button>
                    </div>
                  )}

                  {/* View All / View Less Button */}
                  <button 
                    onClick={toggleExpand}
                    className="inline-block border-2 border-brand-blue text-brand-blue font-bold px-8 py-3 rounded-md hover:bg-brand-blue hover:text-brand-white active:scale-95 transition-all duration-300"
                  >
                    {isExpanded ? "View Less" : "View All Articles"}
                  </button>
                </div>
              </ScrollReveal>
            )}
          </div>
        )}
      </section>
    </div>
  );
}