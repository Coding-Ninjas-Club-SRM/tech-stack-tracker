"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const Navbar = () => {
  const { data: session } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <nav className="text-white w-screen bg-gray-800 flex justify-between items-center p-4 mb-10">
      <Link href="/" className="flex gap-2 justify-center items-center">
        <Image
          src="/icons/logo.png"
          alt="CN logo"
          width={30}
          height={30}
          className="cursor-pointer"
        />
        <p className="max-sm:hidden font-semibold text-lg tracking-wide">
          Coding Ninjas SRM
        </p>
      </Link>
      <div className="flex gap-2">
        {session?.user ? (
          <span
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 cursor-pointer duration-150"
            onClick={() => setToggleDropdown((prev) => !prev)}
          >
            {session?.user?.name?.split(" ")[0]}
          </span>
        ) : (
          <Link
            href="/api/auth/signin"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 duration-150"
          >
            Login
          </Link>
        )}
      </div>

      {toggleDropdown && (
        <div className="absolute m-4 top-20 right-0 z-10 divide-y divide-gray-600 rounded-lg shadow w-auto bg-gray-700">
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{session?.user?.name}</div>
            <div className="font-medium truncate">{session?.user?.email}</div>
          </div>
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <Link
                href="/"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                My Profile
              </Link>
            </li>
            {session?.user && session?.user?.designation !== "member" && (
              <li onClick={() => setToggleDropdown(false)}>
                <Link
                  href="/addUser"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Add User
                </Link>
              </li>
            )}
          </ul>
          <div className="flex items-center justify-center w-full h-auto">
            <button
              type="button"
              onClick={() => {
                setToggleDropdown(false);
                signOut();
              }}
              className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 duration-150 my-2"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
