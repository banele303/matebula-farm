import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-gradient-to-br from-amber-900 via-brown-800 to-orange-900 text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-16 h-16">
                <Image
                  src="/new-logo.png"
                  alt="Mathebula Farm Logo"
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                Mathebula Farm
              </h3>
            </div>
            <p className="text-amber-100 leading-relaxed mb-4 text-sm">
              Fresh farm produce from our hearts to your table. Committed to quality, sustainability, and community.
            </p>
            <div className="flex items-center gap-2 bg-amber-700/40 backdrop-blur-sm px-3 py-2 rounded-lg border border-amber-600/30 w-fit">
              <span className="w-2 h-2 bg-amber-300 rounded-full animate-pulse shadow-sm shadow-amber-300" />
              <span className="text-xs font-semibold text-amber-50">B-BBEE Level 1 Certified</span>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-amber-100 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-amber-400 to-transparent rounded-full" />
            </h4>
            <nav className="space-y-2.5">
              {[
                { href: "/about", label: "About Us" },
                { href: "/products", label: "Products" },
                { href: "/services", label: "Services" },
                { href: "/gallery", label: "Gallery" },
                { href: "/partners", label: "Partners" },
                { href: "/contact", label: "Contact" }
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-amber-200 hover:text-amber-100 hover:translate-x-1 transition-all duration-200 text-sm group"
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="w-0 h-px bg-amber-400 group-hover:w-3 transition-all duration-200" />
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-amber-100 relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-amber-400 to-transparent rounded-full" />
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href="https://maps.google.com/?q=Honingnestkrans,Pretoria"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-amber-200 hover:text-amber-100 transition-colors group"
              >
                <svg className="w-5 h-5 mt-0.5 text-amber-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Honingnestkrans<br />North of Pretoria</span>
              </a>
              
              <a
                href="tel:+27735230659"
                className="flex items-center gap-3 text-amber-200 hover:text-amber-100 transition-colors group"
              >
                <svg className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>+27 73 523 0659</span>
              </a>
              
              <a
                href="mailto:info@mathebulafarm.co.za"
                className="flex items-center gap-3 text-amber-200 hover:text-amber-100 transition-colors group"
              >
                <svg className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>info@mathebulafarm.co.za</span>
              </a>
            </div>
          </div>
          
          {/* Our Commitment */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-amber-100 relative inline-block">
              Our Values
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-amber-400 to-transparent rounded-full" />
            </h4>
            <ul className="space-y-2.5 text-sm text-amber-200">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Sustainable Farming</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Quality First</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Community Focus</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Fresh Daily</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-amber-700/50 pt-6 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-amber-200">
            <p className="text-center sm:text-left">
              &copy; {currentYear} Mathebula Farm. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-amber-300">Empowering communities through sustainable agriculture</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}