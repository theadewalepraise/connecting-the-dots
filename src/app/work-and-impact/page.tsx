import Link from "next/link";
import Image from "next/image";
export default function WorkAndImpact() {
  const partners = [
    { name: "CIPM", src: "/CIPM-logo-large.png", needsRounding: false },
    { name: "ILO", src: "/LjqKzPKIFL6x5lFvbSZ9Aa7Gv_oFbqTr2i2r9nBnPwQ.png", needsRounding: true },
    { name: "UNILAG", src: "/UNILAG-LOGO.png", needsRounding: false },
    { name: "Mastercard Foundation", src: "/mastercard-foundation-vector-logo.png", needsRounding: false },
    { name: "NESG", src: "/nesg-logo-full-color.png", needsRounding: false },
    { name: "PwC", src: "/PwC-PricewaterhouseCoopers-Logo.png", needsRounding: false }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-brand-white">
      {/* Hero Section */}
      <section className="bg-brand-blue text-brand-white py-20 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Bridging the Gaps</h1>
          <p className="text-xl md:text-2xl text-brand-pink font-light">
            Transforming Systems, Empowering People.
          </p>
        </div>
        {/* Subtle background accent */}
        <div className="absolute top-[-50%] left-[-10%] w-[120%] h-[200%] bg-gradient-to-br from-brand-blue via-brand-blue to-[#001a33] -z-0 transform -rotate-6"></div>
      </section>

      {/* Key Projects & Achievements */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-brand-blue inline-block border-b-4 border-brand-pink pb-2">
            Key Projects & Initiatives
          </h2>
        </div>

        <div className="space-y-16">
          {/* Project 1 */}
          <div className="flex flex-col md:flex-row gap-8 items-center group">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="w-32 h-32 rounded-2xl bg-gray-50 border-2 border-gray-200 flex items-center justify-center text-4xl group-hover:border-brand-pink group-hover:-translate-y-2 transition-all duration-500 shadow-sm group-hover:shadow-[0_15px_40px_-10px_rgba(0,51,102,0.15)]">
                {/* 🎯 */}
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-blue transition-colors duration-300">Equity in Action Initiative</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Spearheaded the development of employability hubs designed specifically to support and upskill marginalized youth, providing them with direct pathways into the modern workforce.
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-gray-200"></div>

          {/* Project 2 */}
          <div className="flex flex-col md:flex-row gap-8 items-center group">
            <div className="w-full md:w-1/3 flex justify-center md:order-2">
              <div className="w-32 h-32 rounded-2xl bg-gray-50 border-2 border-gray-200 flex items-center justify-center text-4xl group-hover:border-brand-pink group-hover:-translate-y-2 transition-all duration-500 shadow-sm group-hover:shadow-[0_15px_40px_-10px_rgba(0,51,102,0.15)]">
                {/* 📊 */}
              </div>
            </div>
            <div className="w-full md:w-2/3 md:order-1 md:text-right">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-blue transition-colors duration-300">ILO & Nigerian Youth Employment Inventory</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Delivered comprehensive, data-driven policy recommendations in collaboration with global institutions to redefine national employment strategies and benchmark youth integration.
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-gray-200"></div>

          {/* Project 3 */}
          <div className="flex flex-col md:flex-row gap-8 items-center group">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="w-32 h-32 rounded-2xl bg-gray-50 border-2 border-gray-200 flex items-center justify-center text-4xl group-hover:border-brand-pink group-hover:-translate-y-2 transition-all duration-500 shadow-sm group-hover:shadow-[0_15px_40px_-10px_rgba(0,51,102,0.15)]">
                {/* 🌱 */}
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-blue transition-colors duration-300">Skills Development Practice (SkillsDevt)</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Engineered and implemented long-term workforce transformation strategies tailored for institutional clients to bridge the gap between academic output and industry expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Partnerships Section */}
      <section className="py-24 bg-gray-50 border-t border-gray-200 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center px-6 mb-12">
          <h2 className="text-3xl font-bold text-brand-blue mb-6">Strategic Partnerships</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            I am proud to have collaborated with leading global organizations and institutions dedicated to human capital development and equitable growth.
          </p>
        </div>
        
        {/* The Marquee Container */}
        <div className="relative w-full border-y border-gray-200 bg-white py-10 flex overflow-hidden">
          
          {/* Gradient Overlays for smooth fade-in/fade-out on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

          {/* The Scrolling Track */}
          <div className="flex w-max animate-marquee items-center">
            {[...partners, ...partners].map((partner, index) => (
              <div 
                key={index}
                className="mx-12 relative w-40 h-20 flex-shrink-0 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-500 cursor-pointer"
              >
                <Image 
                  src={partner.src}
                  alt={`${partner.name} logo`}
                  fill
                  sizes="160px"
                  className={`object-contain ${partner.needsRounding ? 'rounded-xl shadow-sm' : ''}`}
                />
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-brand-blue mb-8">Ready to drive systemic change together?</h2>
        <Link 
          href="/contact" 
          className="inline-block bg-brand-pink text-brand-blue font-bold px-10 py-4 rounded-md hover:bg-brand-blue hover:text-brand-white hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
        >
          Partner with Me
        </Link>
      </section>
    </div>
  );
}