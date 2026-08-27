import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-brand-blue text-brand-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Text & CTA */}
          <div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Connecting the Dots <br />
              <span className="text-brand-pink">with Dr. Dets</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-light mb-8 text-gray-200">
              Bridging Gaps, Creating Impact.
            </p>
            
            <blockquote className="border-l-4 border-brand-pink pl-6 mb-10 text-lg md:text-xl text-gray-300 italic leading-relaxed">
              "A just and equitable world values talent over privilege. At Connecting the Dots, we work to bridge the gaps between education, employment, and opportunity—ensuring that access isn’t just for the privileged few."
            </blockquote>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/contact" 
                className="bg-brand-pink text-brand-blue font-bold px-8 py-3 rounded-md hover:bg-white transition-colors duration-300 shadow-lg"
              >
                Work With Me
              </Link>
              <Link 
                href="/about" 
                className="border-2 border-brand-white text-brand-white font-semibold px-8 py-3 rounded-md hover:bg-brand-white hover:text-brand-blue transition-colors duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Column: Professional Headshot */}
          <div className="relative h-[400px] md:h-[550px] w-full group cursor-pointer mt-8 lg:mt-0">
            
            {/* Layer 1: The Stationary Background (Revealed on hover) */}
            <div className="absolute inset-0 rounded-xl overflow-hidden border-2 border-gray-200 z-0">
              <Image 
                src="/AOgwoClanPic.png" 
                alt="Dr. Detoun Ogwo Background" 
                fill
                className="object-cover object-top grayscale opacity-50"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {/* Layer 2: The Top Image (Shifts Up/Left & Colorizes) */}
            <div className="absolute inset-0 rounded-xl overflow-hidden border-4 border-brand-pink/30 group-hover:border-brand-pink transition-all duration-500 ease-out group-hover:-translate-x-6 group-hover:-translate-y-6 group-hover:-rotate-1 group-hover:shadow-[20px_20px_40px_rgba(0,51,102,0.25)] z-10">
              <Image 
                src="/AOgwoClanPic.png" 
                alt="Dr. Adetoun Ogwo" 
                fill
                className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 ease-out"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
          
        </div>
      </section>

      {/* Key Highlights Section */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-blue">Driving Systemic Change in the Modern Workforce</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Highlight 1 */}
            <div className="p-8 bg-white border border-gray-200 hover:border-brand-blue/30 rounded-xl shadow-sm hover:shadow-[0_15px_40px_-10px_rgba(0,51,102,0.12)] hover:-translate-y-2 transition-all duration-500 group cursor-pointer">
              <div className="w-12 h-12 bg-brand-blue text-brand-pink group-hover:bg-brand-pink group-hover:text-brand-blue transition-all duration-500 rounded-full flex items-center justify-center text-xl font-bold mb-6 transform group-hover:scale-110 group-hover:-rotate-6 origin-center shadow-md">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-blue transition-colors duration-300">20+ Years</h3>
              <p className="text-gray-600 leading-relaxed transition-colors duration-300">
                Extensive experience in workforce strategy, education-to-employment pathways, and long-term policy impact.
              </p>
            </div>

            {/* Highlight 2 */}
            <div className="p-8 bg-white border border-gray-200 hover:border-brand-blue/30 rounded-xl shadow-sm hover:shadow-[0_15px_40px_-10px_rgba(0,51,102,0.12)] hover:-translate-y-2 transition-all duration-500 group cursor-pointer">
              <div className="w-12 h-12 bg-brand-blue text-brand-pink group-hover:bg-brand-pink group-hover:text-brand-blue transition-all duration-500 rounded-full flex items-center justify-center text-xl font-bold mb-6 transform group-hover:scale-110 group-hover:-rotate-6 origin-center shadow-md">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-blue transition-colors duration-300">Policy Advocacy</h3>
              <p className="text-gray-600 leading-relaxed transition-colors duration-300">
                Shaping inclusive education-to-work policies through dynamic stakeholder engagement and global partnerships.
              </p>
            </div>

            {/* Highlight 3 */}
            <div className="p-8 bg-white border border-gray-200 hover:border-brand-blue/30 rounded-xl shadow-sm hover:shadow-[0_15px_40px_-10px_rgba(0,51,102,0.12)] hover:-translate-y-2 transition-all duration-500 group cursor-pointer">
              <div className="w-12 h-12 bg-brand-blue text-brand-pink group-hover:bg-brand-pink group-hover:text-brand-blue transition-all duration-500 rounded-full flex items-center justify-center text-xl font-bold mb-6 transform group-hover:scale-110 group-hover:-rotate-6 origin-center shadow-md">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-blue transition-colors duration-300">Employability Research</h3>
              <p className="text-gray-600 leading-relaxed transition-colors duration-300">
                Translating rigorous academic data into practical, industry-driven innovations for an inclusive job market.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}