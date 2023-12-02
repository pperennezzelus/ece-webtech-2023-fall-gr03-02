import React from "react";
import { useUser } from "./UserContext";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const { user, logout, isLoggedIn } = useUser();

  return (
    <header className="shadow-md bg-white sticky top-0 z-10">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link href="/" passHref>
          <span className="flex items-center">
            <Image src="/logo.png" alt="Logo" width={40} height={40} priority />
            <span className="ml-3 text-xl font-bold text-gray-800">
              Pinguin Motors
            </span>
          </span>
        </Link>
        <ul className="flex items-center space-x-8">
          <li>
            <Link href="/" passHref>
              <span className="text-base font-medium text-gray-600 hover:text-indigo-600 transition duration-150 ease-in-out cursor-pointer">
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link href="/articles" passHref>
              <span className="text-base font-medium text-gray-600 hover:text-indigo-600 transition duration-150 ease-in-out cursor-pointer">
                Articles
              </span>
            </Link>
          </li>
          <li>
            <Link href="/contact" passHref>
              <span className="text-base font-medium text-gray-600 hover:text-indigo-600 transition duration-150 ease-in-out cursor-pointer">
                Contact
              </span>
            </Link>
          </li>
          <li>
            <Link href="/about" passHref>
              <span className="text-base font-medium text-gray-600 hover:text-indigo-600 transition duration-150 ease-in-out cursor-pointer">
                About
              </span>
            </Link>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <Link href="/profile" passHref>
                  <span className="text-base font-medium text-gray-600 hover:text-indigo-600 transition duration-150 ease-in-out cursor-pointer">
                    Profile
                  </span>
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="text-base font-medium text-gray-600 hover:text-indigo-600 transition duration-150 ease-in-out focus:outline-none"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login" passHref>
                <span className="text-base font-medium text-gray-600 hover:text-indigo-600 transition duration-150 ease-in-out cursor-pointer">
                  Login
                </span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
