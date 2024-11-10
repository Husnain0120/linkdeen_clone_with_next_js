"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import {
  Briefcase,
  Home,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <SignedOut>
        <div className="flex items-center justify-center bg-slate-100 py-1">
          <p className="animate-pulse rounded-lg bg-gradient-to-r from-purple-600 via-purple-700 to-purple-900 px-4 py-1 text-yellow-200 shadow-lg shadow-purple-500/50">
            Beta Version
          </p>
        </div>
      </SignedOut>

      {/* Mobile Header */}
      <div className="flex items-center gap-3 border-b bg-background p-2 md:hidden">
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
            }}
          />
        </SignedIn>
        <SignedOut>
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg" alt="Profile" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </SignedOut>

        <div className=" md:flex flex-1">
          <form className="flex items-center space-x-1 bg-gray-200 p-2 rounded-full flex-1 ">
            <Search className="h-4 text-gray-600" />
            <input
              type="text"
              placeholder="Search"
              className="h-5 bg-transparent flex-1 outline-none"
            />
          </form>
        </div>

        <Link href={"/addpost"}>
          <Button variant="ghost" size="icon" className="shrink-0">
            <span className="bg-gray-600 p-[1px] rounded-sm font-semibold">
              <Plus className="h-6 w-6  text-white " />
            </span>

            <span className="sr-only">Create new post</span>
          </Button>
        </Link>

        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon" className="shrink-0">
              <MoreHorizontal className="h-6 w-6" />
              <span className="sr-only">More options</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Menu</DrawerTitle>
              <DrawerDescription>
                Access additional options and navigation
              </DrawerDescription>
            </DrawerHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Link
                  href="/"
                  className="flex flex-col items-center justify-center"
                >
                  <Home className="h-6 w-6 mb-1" />
                  <span className="text-sm">Home</span>
                </Link>
                <Link
                  href="#"
                  className="flex flex-col items-center justify-center"
                >
                  <Users className="h-6 w-6 mb-1" />
                  <span className="text-sm">Network</span>
                </Link>
                <Link
                  href="#"
                  className="flex flex-col items-center justify-center"
                >
                  <Briefcase className="h-6 w-6 mb-1" />
                  <span className="text-sm">Jobs</span>
                </Link>
                <Link
                  href="#"
                  className="flex flex-col items-center justify-center"
                >
                  <MessageSquare className="h-6 w-6 mb-1" />
                  <span className="text-sm">Messaging</span>
                </Link>
              </div>
            </div>
            <DrawerFooter>
              <SignedOut>
                <Button asChild variant="secondary" className="w-full">
                  <SignInButton />
                </Button>
                <Button asChild className="w-full">
                  <SignUpButton />
                </Button>
              </SignedOut>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Desktop Header */}
      <div className="hidden items-center p-2 md:flex md:max-w-6xl md:mx-auto">
        <Link href="/" className="flex-shrink-0 pr-4">
          <span className="font-bold">Logo</span>
          <span className="sr-only">Home</span>
        </Link>

        <form className="flex flex-1 max-w-96">
          <div className="flex w-full items-center gap-2 rounded-md bg-muted px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search"
              className="h-8 border-0 bg-transparent p-0 focus-visible:ring-0"
            />
          </div>
        </form>

        <nav className="flex items-center space-x-4 px-6">
          <Link
            href="/"
            className="flex flex-col items-center p-2 text-sm hover:text-primary"
          >
            <Home className="h-5 w-5 mb-1" />
            <span>Home</span>
          </Link>
          <Link
            href="#"
            className="flex flex-col items-center p-2 text-sm hover:text-primary lg:flex"
          >
            <Users className="h-5 w-5 mb-1" />
            <span>Network</span>
          </Link>
          <Link
            href="#"
            className="flex flex-col items-center p-2 text-sm hover:text-primary lg:flex"
          >
            <Briefcase className="h-5 w-5 mb-1" />
            <span>Jobs</span>
          </Link>
          <Link
            href="#"
            className="flex flex-col items-center p-2 text-sm hover:text-primary"
          >
            <MessageSquare className="h-5 w-5 mb-1" />
            <span>Messaging</span>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Button asChild variant="secondary" size="sm">
              <SignInButton />
            </Button>
            <Button asChild size="sm">
              <SignUpButton />
            </Button>
          </SignedOut>
        </div>
      </div>
    </>
  );
}
