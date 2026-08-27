import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export default function Speaking() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-white">
      {/* Hero Section */}
      <section className="bg-brand-blue text-brand-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal delay={0}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Speaking & Engagements</h1>
          </ScrollReveal>
          
          <ScrollReveal delay={150}>
            <p className="text-xl text-brand-pink font-light max-w-2xl mx-auto">
              Delivering data-driven insights and actionable strategies for the future of work, education, and inclusive policy.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Signature Topics */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <ScrollReveal delay={0}>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-blue inline-block border-b-4 border-brand-pink pb-2">
              Signature Keynotes & Topics
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Topic 1 */}
          <ScrollReveal delay={0}>
            <div className="h-full p-8 bg-white border border-gray-200 md:hover:border-brand-blue/30 rounded-xl shadow-sm md:hover:shadow-[0_15px_40px_-10px_rgba(0,51,102,0.12)] md:hover:-translate-y-2 active:scale-[0.98] active:bg-gray-50 transition-all duration-500 group cursor-pointer">
              <div className="text-brand-blue md:group-hover:text-brand-pink transition-all duration-500 mb-6 transform md:group-hover:scale-110 origin-left">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 md:group-hover:text-brand-blue transition-colors duration-300">
                The Education-to-Workforce Pipeline
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Analyzing the systemic gaps between higher education outputs and modern industry demands, and how institutions can build seamless transitions for youth.
              </p>
            </div>
          </ScrollReveal>

          {/* Topic 2 */}
          <ScrollReveal delay={150}>
            <div className="h-full p-8 bg-white border border-gray-200 md:hover:border-brand-blue/30 rounded-xl shadow-sm md:hover:shadow-[0_15px_40px_-10px_rgba(0,51,102,0.12)] md:hover:-translate-y-2 active:scale-[0.98] active:bg-gray-50 transition-all duration-500 group cursor-pointer">
              <div className="text-brand-blue md:group-hover:text-brand-pink transition-all duration-500 mb-6 transform md:group-hover:scale-110 origin-left">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 md:group-hover:text-brand-blue transition-colors duration-300">
                Equity in Action
              </h3>
              <p className="text-gray-600 leading-relaxed">
                How organizations can move beyond performative diversity to build genuinely inclusive hiring frameworks that unlock marginalized talent.
              </p>
            </div>
          </ScrollReveal>

          {/* Topic 3 */}
          <ScrollReveal delay={300}>
            <div className="h-full p-8 bg-white border border-gray-200 md:hover:border-brand-blue/30 rounded-xl shadow-sm md:hover:shadow-[0_15px_40px_-10px_rgba(0,51,102,0.12)] md:hover:-translate-y-2 active:scale-[0.98] active:bg-gray-50 transition-all duration-500 group cursor-pointer">
              <div className="text-brand-blue md:group-hover:text-brand-pink transition-all duration-500 mb-6 transform md:group-hover:scale-110 origin-left">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 md:group-hover:text-brand-blue transition-colors duration-300">
                Shaping National Policy
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Leveraging data and cross-sector partnerships to drive large-scale socio-economic change and integrate youth into the global economy.
              </p>
            </div>
          </ScrollReveal>
          
        </div>
      </section>

      {/* Booking CTA Section */}
      <section className="py-20 px-6 bg-gray-50 border-t border-gray-200">
        <ScrollReveal delay={0}>
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-10 md:p-16 text-center">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Book Dr. Dets for Your Next Event</h2>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              Whether it is a global conference, an executive board retreat, or a university keynote, bring transformative, data-backed insights to your audience.
            </p>
            
            <Link 
              href="/contact" 
              className="inline-flex w-full sm:w-auto justify-center items-center gap-3 bg-brand-pink text-brand-blue font-bold px-10 py-4 rounded-md md:hover:bg-brand-blue md:hover:text-brand-white active:scale-95 md:hover:-translate-y-1 md:hover:shadow-xl transition-all duration-300 group"
            >
              <span>Inquire About Availability</span>
              <svg className="w-5 h-5 transform md:group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}