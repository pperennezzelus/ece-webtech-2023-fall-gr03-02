import React from "react";
import { useUser } from "./UserContext";
import Link from "next/link";
import Image from "next/image";
import { MdArticle, MdContactSupport } from "react-icons/md";
import { IoMdLogIn } from "react-icons/io";
import { CgProfile, CgMoreO } from "react-icons/cg";
import { RiLogoutCircleLine } from "react-icons/ri";


const Header = () => {
  const { user, logout, isLoggedIn } = useUser();

  return (
    <div className="fixed top-0 left-0 h-screen w-24 flex flex-col bg-white dark:bg-gray-900 shadow-lg">
      <Link href="/" passHref>
        <Image src="/logo.png" alt="Logo" width={32} height={32} priority className="flex items-center justify-center mt-3 mb-2 mx-auto  " />
      </Link>
      <div className="mt-2">
        <Link href="/articles" passHref>
          <div className="icon-navbar group mt-2">
            <span className="text-navbar group-hover:scale-100">Articles</span>
            <MdArticle size="36" />
          </div>
        </Link>
      </div>
      <Link href="/contact" passHref>
        <div className="icon-navbar group mt-2">
          <span className="text-navbar group-hover:scale-100">Contact</span>
          <MdContactSupport size="36" />
        </div>
      </Link>

      <Link href="/about" passHref>
        <div className="icon-navbar group mt-2">
          <span className="text-navbar group-hover:scale-100">About</span>
          <CgMoreO size="36" />
        </div>
      </Link>

      {isLoggedIn ? (
        <>
          <Link href="/profile" passHref>
            <div className="icon-navbar group mt-2">
              <span className="text-navbar group-hover:scale-100">Profile</span>
              <CgProfile size="36" />
            </div>
          </Link>
          <div className="icon-navbar group mt-2">
            <RiLogoutCircleLine size="36"
              onClick={logout}
            />
            <span className="text-navbar group-hover:scale-100">Logout</span>
          </div>
        </>
      ) : (

        <Link href="/login" passHref>
          <div className="icon-navbar group mt-2">
            <span className="text-navbar group-hover:scale-100">Login</span>
            <IoMdLogIn size="36" />
          </div>

        </Link>

      )}
    </div>
  );
};

export default Header;
