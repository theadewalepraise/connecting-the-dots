import Link from "next/link";
import Image from "next/image";

export default function Blog() {
  // Placeholder data
  const posts = [
    {
      id: 1,
      title: "Rethinking the Degree: Why Skills-Based Hiring is the Future",
      excerpt: "As industries evolve faster than academic curricula, organizations must pivot toward skills-based assessments to uncover true talent and drive innovation.",
      date: "August 12, 2026",
      category: "Future of Work",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "The Ethical Integration of AI in Talent Acquisition",
      excerpt: "Artificial Intelligence offers unprecedented efficiency in hiring, but without intentional oversight, we risk hardcoding historical biases into our future workforce.",
      date: "July 28, 2026",
      category: "Technology & Ethics",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "Empowering the Next Generation: A Policy Blueprint",
      excerpt: "Insights from the latest national youth employment inventory, highlighting the urgent need for cross-sector collaboration to bridge the opportunity gap.",
      date: "July 10, 2026",
      category: "Policy Advocacy",
      readTime: "6 min read",
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-brand-white">
      
      {/* Hero Section */}
      <section className="bg-brand-blue text-brand-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Thoughts & Perspectives</h1>
          <p className="text-xl text-brand-pink font-light max-w-2xl mx-auto">
            Explorations, research, and reflections on creating a more equitable global workforce.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-24 px-6 max-w-6xl mx-auto w-full">
        
        {/* Featured Article */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-400 uppercase tracking-widest mb-8 text-center md:text-left">Featured Insight</h2>
          
          <div className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_20px_50px_-12px_rgba(179,0,89,0.15)] hover:border-brand-pink/30 hover:-translate-y-2 transition-all duration-500 group flex flex-col md:flex-row cursor-pointer">
            
            {/* Featured Image */}
            <div className="w-full md:w-1/2 min-h-[300px] md:min-h-[400px] relative overflow-hidden bg-gray-100">
              <div className="absolute inset-0">
                <Image 
                  src="/Detoun-Ogwo.jpg" 
                  alt="Dr. Detoun Ogwo Featured Insight" 
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
            
            {/* Featured Content */}
            <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-wider mb-4">
                <span className="bg-brand-pink text-white px-3 py-1 rounded-full text-xs">Workforce Strategy</span>
                <span className="text-gray-500">August 20, 2026</span>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-brand-pink transition-colors duration-300">
                Bridging the Gap: How Universities Can Partner with Industry
              </h3>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                A deep dive into the collaborative frameworks required to align higher education outcomes with the fast-paced realities of the modern global market.
              </p>
              
              <Link href="#" className="inline-flex items-center gap-2 text-brand-blue font-bold hover:text-brand-pink transition-colors duration-300 w-fit">
                Read Full Article
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Articles Grid */}
        <div className="border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-bold text-brand-blue mb-10">Recent Publications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post.id} className="bg-white border border-gray-200 p-8 rounded-xl hover:shadow-[0_15px_40px_-10px_rgba(179,0,89,0.12)] hover:-translate-y-2 hover:border-brand-pink/30 transition-all duration-500 group flex flex-col h-full cursor-pointer">
                
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider mb-4">
                  <span className="bg-brand-pink text-white px-3 py-1 rounded-full">{post.category}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-pink transition-colors duration-300">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-4 mt-auto">
                  <span className="text-gray-500">{post.date}</span>
                  <span className="text-brand-blue font-medium group-hover:text-brand-pink transition-colors">{post.readTime}</span>
                </div>
                
              </div>
            ))}
          </div>
        </div>
        
      </section>
    </div>
  );
}