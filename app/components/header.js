import React, { useState, useContext, useEffect } from "react";
import { useUser } from "./UserContext";
import { DarkModeContext } from "./DarkModeContext";
import Link from "next/link";
import Image from "next/image";
import { MdArticle, MdContactSupport } from "react-icons/md";
import { IoMdLogIn } from "react-icons/io";
import { CgProfile, CgMoreO } from "react-icons/cg";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FiSun, FiMoon, FiSearch } from "react-icons/fi";
import { searchArticles } from "../utils/api";

const Header = () => {
  const { user, logout, isLoggedIn } = useUser();
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.length > 2) {
        try {
          const results = await searchArticles(searchQuery);
          console.log(results);
          setSearchResults(results);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    };
    fetchSearchResults();
  }, [searchQuery]);

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-24 flex flex-col ${
        isDarkMode ? "dark:bg-gray-900" : "bg-indigo-200"
      } shadow-lg`}
    >
      {/* Search Icon */}
      <div className="search-icon mt-2 mx-auto">
        <FiSearch size="24" onClick={toggleSearch} />
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10">
          <div className="flex justify-center items-center h-full">
            <input
              type="text"
              className="p-2 w-3/4 max-w-md rounded-lg border border-gray-300 dark:border-gray-700 text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              autoFocus
            />
            <button className="text-white ml-2" onClick={closeSearch}>
              Close
            </button>
          </div>
          <div className="absolute top-16 w-full flex justify-center">
            {/* Display search results */}
            <div className="space-y-2 max-w-md">
              {searchResults.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.id}`}
                  className="flex items-center bg-white p-2 rounded-lg shadow hover:shadow-md transition-shadow duration-200 ease-in-out"
                  passHref
                >
                  <div className="w-12 h-12 relative mr-2">
                    <Image
                      src={
                        article.image_urls && article.image_urls.length > 0
                          ? article.image_urls[0]
                          : "pinguin_squad.png" //default image
                      }
                      alt={article.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <div className="truncate">
                    <h2 className="text-sm font-semibold">{article.title}</h2>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Logo */}
      <Link
        href="/"
        className="flex items-center justify-center mt-3 mb-2 mx-auto"
      >
        <Image src="/logo.png" alt="Logo" width={32} height={32} priority />
      </Link>

      {/* Navbar Items */}
      <div className="mt-2">
        <Link href="/articles" className="icon-navbar group mt-2">
          <MdArticle size="36" />
          <span className="text-navbar group-hover:scale-100">Articles</span>
        </Link>

        <Link href="/contact" className="icon-navbar group mt-2">
          <MdContactSupport size="36" />
          <span className="text-navbar group-hover:scale-100">Contact</span>
        </Link>

        <Link href="/about" className="icon-navbar group mt-2">
          <CgMoreO size="36" />
          <span className="text-navbar group-hover:scale-100">About</span>
        </Link>

        {isLoggedIn ? (
          <>
            <Link href="/profile" className="icon-navbar group mt-2">
              <CgProfile size="36" />
              <span className="text-navbar group-hover:scale-100">Profile</span>
            </Link>
            <div
              className="icon-navbar group mt-2 cursor-pointer"
              onClick={logout}
            >
              <RiLogoutCircleLine size="36" />
              <span className="text-navbar group-hover:scale-100">Logout</span>
            </div>
          </>
        ) : (
          <Link href="/login" className="icon-navbar group mt-2">
            <IoMdLogIn size="36" />
            <span className="text-navbar group-hover:scale-100">Login</span>
          </Link>
        )}
      </div>

      {/* Dark Mode Toggle */}
      <button
        className={`toggle-button text-white flex items-center justify-center mt-2 mb-2 mx-auto ${
          isDarkMode
            ? "bg-gray-800 dark:hover:bg-gray-600"
            : "bg-indigo-400 hover:bg-indigo-600"
        } text-indigo-500 hover:text-white rounded-full transition-all duration-300 ease-linear cursor-pointer shadow-lg p-2`}
        onClick={toggleDarkMode}
      >
        {isDarkMode ? <FiSun size="24" /> : <FiMoon size="24" />}
      </button>
    </div>
  );
};

export default Header;
