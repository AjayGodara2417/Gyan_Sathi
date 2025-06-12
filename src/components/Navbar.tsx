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
} from "lucide-react";

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

  return (
    <aside className="w-[260px] h-screen bg-amber-100 border-r border-black-200 flex flex-col justify-between px-6 py-8 fixed">
      {/* Top: Profile + Nav */}
      <div>
        {/* Profile */}
        <div className="flex items-center gap-3 mb-8 pl-4">
          <UserButton afterSignOutUrl="/" />
          <div>
            <p className="font-semibold">{user?.fullName ?? "Hi, Guest"}</p>
            <p className="text-sm text-gray-500">Student</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="flex items-center gap-3 text-gray-700 hover:bg-green-100 px-4 py-2 rounded-md transition-all"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom: Auth */}
      <div className="flex flex-col gap-2">
        <SignedOut>
        <SignUpButton mode="modal">
            <button className="w-full bg-green-100 text-green-600 hover:text-white py-2 rounded-md hover:bg-green-500 transition">
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
            <button className="w-full bg-red-100 text-red-600 py-2 rounded-md hover:bg-red-200 transition">
              Sign Out
            </button>
          </SignOutButton>
        </SignedIn>
      </div>
    </aside>
  );
};

export default Navbar;
