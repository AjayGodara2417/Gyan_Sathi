'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Optional: for icons, or use emoji fallback

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-black text-white px-4 sm:px-10 py-4 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold tracking-wide hover:text-orange-400 transition-colors">
          Gyan Saathi
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {['Home', 'AI', 'Notes', 'Discussion', 'About', 'Contact Us'].map((item, i) => (
            <Link
              key={i}
              href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '')}`}
              className="hover:text-orange-400 transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-sm font-medium">
          {['Home', 'AI', 'Notes', 'Discussion', 'About', 'Contact Us'].map((item, i) => (
            <Link
              key={i}
              href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '')}`}
              className="hover:text-orange-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
