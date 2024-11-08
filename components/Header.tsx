"use client";

import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { useState } from "react";
import {
  Briefcase,
  Home,
  MessageSquare,
  SearchIcon,
  Users,
  X,
} from "lucide-react";

import Link from "next/link";
import { Button } from "./ui/button";
import { Logo } from "./logo";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleMobileNav = () => setIsMobileNavOpen(!isMobileNavOpen);

  return (
    <>
      <SignedOut>
        <div className="  flex items-center justify-center bg-slate-100 text-yellow-700 py-1">
          <p className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-900 px-4 py-1 rounded-lg text-yellow-200 shadow-lg shadow-purple-500/50 animate-pulse">
            Beta Version
          </p>
        </div>
      </SignedOut>
      <div className="flex items-center p-2 max-w-6xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 pr-4">
          <Logo />
        </Link>

        {/* Search Icon (Mobile) */}
        <div className="flex-1 md:hidden">
          <button
            onClick={toggleSearch}
            className="p-2 bg-gray-200 rounded-md flex items-center"
          >
            <SearchIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1">
          <form className="flex items-center space-x-1 bg-gray-200 p-2 rounded-md flex-1 max-w-96">
            <SearchIcon className="h-4 text-gray-600" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent flex-1 outline-none"
            />
          </form>
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-4 px-6">
          <Link href={"/"} className="icon">
            <Home className="h-5" />
            <p>Home</p>
          </Link>

          <Link href={"/network"} className="icon hidden lg:flex">
            <Users className="h-5" />
            <p>Network</p>
          </Link>

          <Link href={"/jobs"} className="icon hidden lg:flex">
            <Briefcase className="h-5" />
            <p>Jobs</p>
          </Link>

          <Link href={"/messaging"} className="icon">
            <MessageSquare className="h-5" />
            <p>Messaging</p>
          </Link>
        </div>

        {/* User Button & Auth Buttons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <Button asChild variant="secondary" className="text-sm px-2 py-1">
              <SignInButton />
            </Button>
            <Button asChild variant="destructive" className="text-sm px-2 py-1">
              <SignUpButton />
            </Button>
          </SignedOut>

          {/* Mobile Navigation Toggle */}
          <button className="md:hidden" onClick={toggleMobileNav}>
            <Home className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Search Modal */}
        {isSearchOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg w-full max-w-md">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Search</h2>
                <button onClick={toggleSearch}>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form className="mt-4">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full p-2 border rounded-md"
                />
              </form>
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMobileNavOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
              <Link href={"/"} className="icon">
                <Home className="h-5" />
                <p>Home</p>
              </Link>

              <Link href={"/network"} className="icon">
                <Users className="h-5" />
                <p>Network</p>
              </Link>

              <Link href={"/jobs"} className="icon">
                <Briefcase className="h-5" />
                <p>Jobs</p>
              </Link>

              <Link href={"/messaging"} className="icon">
                <MessageSquare className="h-5" />
                <p>Messaging</p>
              </Link>

              <button onClick={toggleMobileNav} className="text-red-500">
                Close Menu
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
