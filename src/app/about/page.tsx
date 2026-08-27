import Link from "next/link";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-white">
      {/* Hero Section */}
      <section className="bg-brand-blue text-brand-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">The Journey of Dr. Dets</h1>
          <p className="text-xl text-brand-gold font-light">Championing Equity in Education and Employment</p>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="prose prose-lg max-w-none text-gray-700">
          <h2 className="text-2xl font-bold text-brand-blue mb-6 border-b-2 border-brand-gold pb-2 inline-block">
            Philosophy & Purpose
          </h2>
          <p className="mb-6 font-medium text-xl text-gray-900 italic">
            "True progress is when access to opportunity is based on talent, not background."
          </p>
          <p className="mb-6 leading-relaxed">
            My journey began at the intersection of human resources and social enterprise, where I witnessed firsthand the systemic barriers preventing talented individuals from accessing meaningful work. This realization sparked a multi-decade commitment to equity-driven workforce development.
          </p>
          <p className="mb-12 leading-relaxed">
            From grassroots youth employability programs to shaping national labor policies, my focus remains on creating actionable, scalable solutions that connect potential with opportunity.
          </p>

          <h2 className="text-2xl font-bold text-brand-blue mb-6 border-b-2 border-brand-gold pb-2 inline-block">
            Key Milestones
          </h2>
          <ul className="space-y-8 mt-6 list-none pl-0">
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-3 h-3 mt-2 rounded-full bg-brand-gold"></div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Social Enterprise Leadership</h3>
                <p className="mt-1">Co-founded AGDC, successfully impacting 24,410 youth through comprehensive employability programs.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-3 h-3 mt-2 rounded-full bg-brand-gold"></div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">National Policy Execution</h3>
                <p className="mt-1">Led the $200M N-Tax Program, strategically integrating 7,500 youth into the national workforce.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-3 h-3 mt-2 rounded-full bg-brand-gold"></div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Academic Rigor</h3>
                <p className="mt-1">Conducted pioneering doctoral research at University College London (UCL), shaping modern education-to-work policies.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-3 h-3 mt-2 rounded-full bg-brand-gold"></div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Global Engagement</h3>
                <p className="mt-1">Collaborated on high-level policy initiatives with the ILO, PwC, the UK Government, and aligned with the UN SDGs to drive global systemic change.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16 px-6 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-brand-blue mb-6">Explore the data behind the work.</h2>
          <Link 
            href="/work-and-impact" 
            className="inline-block bg-brand-blue text-brand-white font-medium px-8 py-3 rounded-md hover:bg-brand-gold hover:text-brand-blue transition-colors duration-300 shadow-md"
          >
            Learn More About My Impact
          </Link>
        </div>
      </section>
    </div>
  );
}