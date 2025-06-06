import React from 'react';
import Link from 'next/link';
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
export default function Join() {
  const { isSignedIn } = useUser();

  return (
    <section className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Join Our Thriving Student Community</h2>
        <p className="text-gray-600 text-base max-w-xl mx-auto">
          Connect with peers, access valuable resources, and elevate your academic journey.
        </p>
        <div className="space-x-4 flex justify-center">
        {!isSignedIn ? (
          <>
            <SignUpButton mode="modal">
              <button className="bg-orange-400 text-black px-6 py-3 rounded-md font-semibold transition-transform duration-300 hover:scale-105">
                Sign Up
              </button>
            </SignUpButton>
            <SignInButton mode="modal">
              <button className="bg-gray-800 text-white px-6 py-3 rounded-md font-semibold transition-transform duration-300 hover:scale-105">
                Log In
              </button>
            </SignInButton>
          </>
        ) : (
          <Link
            href="/notes"
            className="bg-orange-400 text-white px-6 py-3 rounded-md font-semibold transition-transform duration-300 hover:scale-105"
          >
            Start Uploading
          </Link>
        )}
      </div>
      </section>
  );
}
