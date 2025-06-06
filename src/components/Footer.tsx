'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-20 py-10 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto space-y-6 text-center sm:text-left">
        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 text-sm text-gray-700">
          <Link href="/notes" className="hover:text-green-600 transition-colors">
            Download Notes
          </Link>
          <Link href="/ai" className="hover:text-green-600 transition-colors">
            Ask Questions
          </Link>
          <Link href="/about" className="hover:text-green-600 transition-colors">
            About
          </Link>
          <Link href="/contactus" className="hover:text-green-600 transition-colors">
            Contact Us
          </Link>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300" />

        {/* Copyright */}
        <div className="text-xs text-gray-500 text-center space-x-2">
          <span>© {new Date().getFullYear()} Educate. All rights reserved.</span>
          <span>|</span>
          <Link href="#" className="hover:text-green-600">Privacy Policy</Link>
          <span>|</span>
          <Link href="#" className="hover:text-green-600">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
