import React, { useState, useEffect } from "react";
import Link from "next/link";

const Header = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("/api/profile");
        if (response.status === 200) {
          const data = await response.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  return (
    <header>
      <nav className="bg-indigo-400 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center text-2xl text-white font-semibold"
          >
            <img src="logo.png" alt="Logo" className="h-8 w-8 mr-2" />
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
                Articles{" "}
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Contact{" "}
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                About{" "}
              </Link>
            </li>
            {loading ? null : user ? (
              <li className="flex items-center space-x-2">
                {/* placeholder for an account icon.*/}
                <span className="bg-white rounded-full p-2">🚹</span>
                <span className="text-white">{user.username}</span>
              </li>
            ) : null}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
