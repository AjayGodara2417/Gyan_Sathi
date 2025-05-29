'use client';
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  // UserButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
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
        <nav className="hidden md:flex gap-6 text-sm font-medium items-center">
          {['Home', 'AI', 'Notes', 'Discussion', 'About', 'Contact Us', 'Products'].map((item, i) => (
            <Link
              key={i}
              href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '')}`}
              className="hover:text-orange-400 transition-colors"
            >
              {item}
            </Link>
          ))}

          {/* Sign up */}
          <SignedOut>

              <SignUpButton mode="modal">
                <button className="text-white border-1 border-gray-50  hover:bg-orange-400 hover:text-black px-6 py-3 rounded-md font-semibold transition-transform duration-300 hover:scale-105 shadow">
                  Sign Up
                </button>
              </SignUpButton>

              <SignInButton mode="modal">
                <button className="bg-orange-400 text-black px-6 py-3 rounded-md font-semibold transition-transform duration-300 hover:text-white hover:scale-105 shadow">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              {/* <Link href="/user-profile" className="text-2xl">👦🏻</Link> */}
              <SignOutButton>
                <button className="bg-orange-400 text-black hover:text-white px-6 py-3 rounded-md font-semibold transition-transform duration-300 hover:scale-105 shadow">Sign Out</button>
              </SignOutButton>
            </SignedIn>
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
