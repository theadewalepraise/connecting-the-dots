import Link from "next/link";

export default function Navbar() {
  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Thought Leadership", path: "/thought-leadership" },
    { name: "Work & Impact", path: "/work-and-impact" },
    { name: "Speaking", path: "/speaking" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <header className="bg-brand-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand Name */}
        <Link href="/" className="text-xl font-bold text-brand-blue tracking-tight">
          Connecting the Dots
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path}
              className="text-sm font-medium text-gray-700 hover:text-brand-pink transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          {/* CTA Button */}
          <Link 
            href="/contact"
            className="bg-brand-blue text-brand-white px-5 py-2 rounded-md text-sm font-medium hover:bg-brand-pink transition-colors"
          >
            Work With Me
          </Link>
        </nav>
      </div>
    </header>
  );
}