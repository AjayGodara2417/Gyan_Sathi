"use client";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import {
  Home,
  BookOpen,
  Hash,
  ShoppingBag,
  Contact,
  AtSign,
  Brain,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Home", href: "/", icon: <Home size={20} /> },
  { name: "Notes", href: "/notes", icon: <BookOpen size={20} /> },
  { name: "Channels", href: "/discussion", icon: <Hash size={20} /> },
  { name: "AI", href: "/ai", icon: <Brain size={20} /> },
  { name: "Q&A", href: "/question", icon: <HelpCircle size={20} /> },
  { name: "Marketplace", href: "/products", icon: <ShoppingBag size={20} /> },
  { name: "About", href: "/about", icon: <AtSign size={20} /> },
  { name: "Contact Us", href: "/contactus", icon: <Contact size={20} /> },
];

const Navbar = () => {
  const { user } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navContent = (
    <>
      <div className="flex items-center gap-3 mb-8 pl-8">
        <UserButton afterSignOutUrl="/" />
        <div>
          <p className="font-semibold">{user?.fullName ?? "Hi, Guest"}</p>
          <p className="text-sm text-gray-500">Student</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 text-gray-700 hover:bg-green-100 px-4 py-2 rounded-md transition-all"
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="flex flex-col gap-2 items-center mt-8 fixed bottom-8 w-fit ">
        <SignedOut>
          <SignUpButton mode="modal">
            <button className="w-full px-18 bg-green-100 text-green-600 hover:text-white py-2 rounded-md hover:bg-green-500 transition">
              Sign Up
            </button>
          </SignUpButton>
          <SignInButton mode="modal">
            <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <SignOutButton>
            <button className="w-full px-18 bg-red-100 text-red-600 py-2 rounded-md hover:bg-red-200 transition">
              Sign Out
            </button>
          </SignOutButton>
        </SignedIn>
      </div>
    </>
  );

  return (
    <>
      {/* Hamburger Icon (only on mobile) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-amber-100 p-2 rounded-md shadow"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Sidebar (overlay) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-amber-100 z-40 shadow-lg p-6 transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        {navContent}
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-[260px] h-screen bg-amber-100 border-r border-black-200 flex-col justify-between px-6 py-8 fixed">
        <div>{navContent}</div>
      </aside>
    </>
  );
};

export default Navbar;
