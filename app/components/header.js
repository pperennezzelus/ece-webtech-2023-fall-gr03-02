import React from "react";
import { useUser } from "./UserContext";
import Link from "next/link";
import Image from "next/image"; // Import Image component

const Header = () => {
  const { user, logout, isLoggedIn } = useUser();

  return (
    <header>
      <nav className="bg-indigo-400 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center text-2xl text-white font-semibold"
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="mr-2"
            />
            Pinguin Motors
          </Link>
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/articles"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Articles
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                About
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link
                    href="/profile"
                    className="text-white hover:text-gray-300 transition duration-300"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="text-white hover:text-gray-300 transition duration-300"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <style jsx>{`
        li:hover > div {
          display: block;
        }
      `}</style>
    </header>
  );
};

export default Header;
