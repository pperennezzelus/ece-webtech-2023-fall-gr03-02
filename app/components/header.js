import React from "react";
import { useUser } from "./UserContext";
import { DarkModeContext } from './DarkModeContext';
import Link from "next/link";
import Image from "next/image";
import { MdArticle, MdContactSupport } from "react-icons/md";
import { IoMdLogIn } from "react-icons/io";
import { CgProfile, CgMoreO } from "react-icons/cg";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FiSun, FiMoon } from "react-icons/fi";
import { useContext } from 'react';


const Header = () => {
  const { user, logout, isLoggedIn } = useUser();
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div className={`fixed top-0 left-0 h-screen w-24 flex flex-col bg-white ${isDarkMode ? 'dark:bg-gray-900' : ''} shadow-lg`}>
      <Link href="/" passHref>
        <Image src="/logo.png" alt="Logo" width={32} height={32} priority className="flex items-center justify-center mt-3 mb-2 mx-auto" />
      </Link>

      <div className="mt-2">
        <Link href="/articles" passHref>
          <div className={`icon-navbar group mt-2 ${isDarkMode ? 'dark:hover:bg-gray-600' : 'hover:bg-indigo-600'}`}>
            <span className={`text-navbar group-hover:scale-100 ${isDarkMode ? 'dark:text-gray-200' : ''}`}>Articles</span>
            <MdArticle size="36" />
          </div>
        </Link>

        <Link href="/contact" passHref>
          <div className={`icon-navbar group mt-2 ${isDarkMode ? 'dark:hover:bg-gray-600' : 'hover:bg-indigo-600'}`}>
            <span className={`text-navbar group-hover:scale-100 ${isDarkMode ? 'dark:text-gray-200' : ''}`}>Contact</span>
            <MdContactSupport size="36" />
          </div>
        </Link>

        <Link href="/about" passHref>
          <div className={`icon-navbar group mt-2 ${isDarkMode ? 'dark:hover:bg-gray-600' : 'hover:bg-indigo-600'}`}>
            <span className={`text-navbar group-hover:scale-100 ${isDarkMode ? 'dark:text-gray-200' : ''}`}>About</span>
            <CgMoreO size="36" />
          </div>
        </Link>

        {isLoggedIn ? (
          <>
            <Link href="/profile" passHref>
              <div className={`icon-navbar group mt-2 ${isDarkMode ? 'dark:hover:bg-gray-600' : 'hover:bg-indigo-600'}`}>
                <span className={`text-navbar group-hover:scale-100 ${isDarkMode ? 'dark:text-gray-200' : ''}`}>Profile</span>
                <CgProfile size="36" />
              </div>
            </Link>
            <div className={`icon-navbar group mt-2 ${isDarkMode ? 'dark:hover:bg-gray-600' : 'hover:bg-indigo-600'}`} onClick={logout}>
              <RiLogoutCircleLine size="36" />
              <span className={`text-navbar group-hover:scale-100 ${isDarkMode ? 'dark:text-gray-200' : ''}`}>Logout</span>
            </div>
          </>
        ) : (
          <Link href="/login" passHref>
            <div className={`icon-navbar group mt-2 ${isDarkMode ? 'dark:hover:bg-gray-600' : 'hover:bg-indigo-600'}`}>
              <span className={`text-navbar group-hover:scale-100 ${isDarkMode ? 'dark:text-gray-200' : ''}`}>Login</span>
              <IoMdLogIn size="36" />
            </div>
          </Link>
        )}
      </div>

      <button
        className={`toggle-button text-white flex items-center justify-center mt-2 mb-2 mx-auto ${isDarkMode ? 'bg-gray-800 dark:hover:bg-gray-600' : 'bg-indigo-400 hover:bg-indigo-600' } text-indigo-500 hover:text-white rounded-3xl transition-all duration-300 ease-linear cursor-pointer shadow-lg p-2`}
        onClick={toggleDarkMode}
      >
        {isDarkMode ? <FiSun size="24" /> : <FiMoon size="24" />}
      </button>
    </div>
  );
};

export default Header;