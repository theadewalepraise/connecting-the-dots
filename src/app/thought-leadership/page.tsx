import Link from "next/link";

export default function ThoughtLeadership() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-white">
      {/* Hero Section */}
      <section className="bg-brand-blue text-brand-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Insights & Innovations</h1>
          <p className="text-xl text-brand-pink font-light">Research and Strategy for an Inclusive Future</p>
        </div>
      </section>

      {/* Core Focus Areas */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-brand-blue mb-12">Core Focus Areas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Focus Area 1 */}
          <div className="p-8 bg-white border border-gray-200 hover:border-brand-blue/30 rounded-xl shadow-sm hover:shadow-[0_15px_40px_-10px_rgba(0,51,102,0.12)] hover:-translate-y-2 transition-all duration-500 group cursor-pointer">
            <div className="text-brand-blue group-hover:text-brand-pink transition-all duration-500 mb-4 transform group-hover:scale-110 origin-left">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-blue transition-colors duration-300">The Future of Work & AI-Driven Hiring</h3>
            <p className="text-gray-600 leading-relaxed">Navigating the ethical integration of technology in talent acquisition and ensuring marginalized groups are not left behind.</p>
          </div>

          {/* Focus Area 2 */}
          <div className="p-8 bg-white border border-gray-200 hover:border-brand-blue/30 rounded-xl shadow-sm hover:shadow-[0_15px_40px_-10px_rgba(0,51,102,0.12)] hover:-translate-y-2 transition-all duration-500 group cursor-pointer">
            <div className="text-brand-blue group-hover:text-brand-pink transition-all duration-500 mb-4 transform group-hover:scale-110 origin-left">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-blue transition-colors duration-300">Equitable Employment Practices</h3>
            <p className="text-gray-600 leading-relaxed">Designing frameworks for unbiased, workforce-driven innovation that values talent over privilege.</p>
          </div>

          {/* Focus Area 3 */}
          <div className="p-8 bg-white border border-gray-200 hover:border-brand-blue/30 rounded-xl shadow-sm hover:shadow-[0_15px_40px_-10px_rgba(0,51,102,0.12)] hover:-translate-y-2 transition-all duration-500 group cursor-pointer">
            <div className="text-brand-blue group-hover:text-brand-pink transition-all duration-500 mb-4 transform group-hover:scale-110 origin-left">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-blue transition-colors duration-300">Higher Education & Skills Development</h3>
            <p className="text-gray-600 leading-relaxed">Aligning academic outputs with industry demands through dynamic stakeholder engagement.</p>
          </div>

        </div>
      </section>

      {/* Featured Publications */}
      <section className="py-16 px-6 bg-brand-blue text-brand-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 border-b-2 border-brand-pink pb-4 inline-block">Featured Publications & Research</h2>
          
          <div className="space-y-8">
            <div className="bg-white/10 p-8 rounded-xl border border-white/20 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-brand-pink mb-2">Higher Education & Workforce Preparedness in Nigeria</h3>
              <p className="text-gray-200 mb-4 italic">Excerpts and findings from doctoral thesis, University College London (UCL)</p>
              <p className="text-gray-300 leading-relaxed mb-6">A pioneering exploration into the disconnect between academic curricula and the evolving demands of the modern labor market, offering systemic frameworks for alignment.</p>
              <button className="text-brand-white font-semibold underline hover:text-brand-pink transition-colors">Read Excerpt &rarr;</button>
            </div>

            <div className="bg-white/10 p-8 rounded-xl border border-white/20 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-brand-pink mb-2">Industry Reports & Policy Papers</h3>
              <p className="text-gray-200 mb-4 italic">Collaborative research with ILO, NESG, and CIPM</p>
              <p className="text-gray-300 leading-relaxed mb-6">Strategic frameworks and data-driven policy recommendations designed to redefine national employment strategies and foster inclusive hiring practices.</p>
              <button className="text-brand-white font-semibold underline hover:text-brand-pink transition-colors">Download Reports &rarr;</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-brand-blue mb-8">Want to dive deeper into these insights?</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            href="/blog" 
            className="bg-brand-blue text-brand-white font-medium px-8 py-3 rounded-md hover:bg-brand-pink hover:text-brand-blue transition-colors shadow-md"
          >
            Read My Research
          </Link>
          <Link 
            href="/speaking" 
            className="border-2 border-brand-blue text-brand-blue font-bold px-8 py-3 rounded-md hover:bg-brand-blue hover:text-brand-white transition-colors"
          >
            Book Me for a Talk
          </Link>
        </div>
      </section>
    </div>
  );
}