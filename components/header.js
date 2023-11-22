import React from "react";
import { useUser } from "./UserContext";
import Link from "next/link";

const Header = () => {
  const { user, logout } = useUser(); // Access user and logout function from UserContext component

  return (
    <header>
      <nav className="bg-indigo-400 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center text-2xl text-white font-semibold"
          >
            <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
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
            {user ? (
              <>
                <Link
                  href="/login"
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  <li className="text-white flex items-center">
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="h-6 w-6 rounded-full mr-2"
                    />
                    {user.name}
                  </li>
                </Link>
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
