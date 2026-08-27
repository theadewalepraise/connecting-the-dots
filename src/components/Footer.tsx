import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-blue text-brand-white pt-16 pb-8 border-t-4 border-brand-pink">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block text-2xl font-bold text-brand-white tracking-tight mb-4 group">
              Dr. Detoun <span className="text-brand-pink group-hover:text-white transition-colors duration-300">Ogwo</span>
            </Link>
            <p className="text-gray-300 leading-relaxed max-w-sm">
              Championing equity in education, transforming workforce policies, and empowering the next generation of global talent.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            {/* <h3 className="text-lg font-bold text-brand-pink mb-6 uppercase tracking-wider text-sm">Navigation</h3> */}
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-300 hover:text-brand-pink transition-colors duration-300">About Dr. Dets</Link></li>
              <li><Link href="/thought-leadership" className="text-gray-300 hover:text-brand-pink transition-colors duration-300">Thought Leadership</Link></li>
              <li><Link href="/work-and-impact" className="text-gray-300 hover:text-brand-pink transition-colors duration-300">Work & Impact</Link></li>
              <li><Link href="/speaking" className="text-gray-300 hover:text-brand-pink transition-colors duration-300">Speaking</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-brand-pink transition-colors duration-300">Blog</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-bold text-brand-pink mb-6 uppercase tracking-wider text-sm">Connect</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://ng.linkedin.com/in/detounogwo" className="text-gray-300 hover:text-brand-pink transition-colors duration-300 flex items-center gap-2 group">
                  <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:drdets@yahoo.com" className="text-gray-300 hover:text-brand-pink transition-colors duration-300 flex items-center gap-2 group">
                  <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  Email Me
                </a>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {currentYear} Dr. Detoun Ogwo. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-brand-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-brand-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}