import {
  Briefcase,
  Home,
  MessageSquare,
  SearchIcon,
  Users,
} from "lucide-react";

import Link from "next/link";

const Header = () => {
  return (
    <div className=" flex items-center p-2 max-w-6xl mx-auto">
      <Link href="/" className="flex-shrink-0 pr-4">
        <svg
          className="h-10 w-10 text-blue-600"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      </Link>

      <div className="flex-1">
        <form className=" flex items-center space-x-1 bg-gray-200 p-2 rounded-md flex-1 max-w-96">
          <SearchIcon className="h-4 text-gray-600" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent flex-1 outline-none"
          />
        </form>
      </div>

      <div className=" flex items-center space-x-4 px-6">
        <Link href={"/"} className="icon">
          <Home className="h-5" />
          <p>Home</p>
        </Link>

        <Link href={"/network"} className="icon hidden md:flex">
          <Users className="h-5" />
          <p>Network</p>
        </Link>

        <Link href={"/jobs"} className="icon hidden md:flex">
          <Briefcase className="h-5" />
          <p>Jobs</p>
        </Link>

        <Link href={"/messaging"} className="icon ">
          <MessageSquare className="h-5" />
          <p>Messaging</p>
        </Link>

        {/* User Button  if SignIN*/}

        {/* Sign in Button if not signIN */}
      </div>
    </div>
  );
};

export default Header;
