"use client";

import React from "react";
import Link from "next/link";
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";

export default function JoinBanner() {
  const { isSignedIn } = useUser();

  return (
    <section className="bg-black text-white py-20 text-center px-4 sm:px-10">
      <h2 className="text-3xl font-bold mb-4">Join Our Learning Community Today</h2>
      <p className="mb-6 text-gray-400">
        Sign up now to access notes, ask questions, and engage in educational discussions with peers.
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
