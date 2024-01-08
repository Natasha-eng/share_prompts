"use client";

import Image from "next/image";
import Link from "next/link";
import { getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const Nav = () => {
  const [userData, setUserData] = useState(null);

  const [toggleDropdown, setToggleDropdown] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const getUser = async () => {
      const user = await fetch("/api/isAuth");
      const parsedUser = await user.json();
      setUserData(parsedUser);
    };
    if (pathname === "/" && !userData) {
      getUser();
    }
  }, [pathname, userData]);

  const signOut = async () => {
    const response = await fetch(`/api/signout`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    data.done && setToggleDropdown(false);
    data.done && router.push("/");
    setUserData(null);
  };

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          alt="Prompt logo"
          src="/images/logo.svg"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Prompt & Share</p>
      </Link>
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {userData?.userId ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">{userData?.username}</Link>
          </div>
        ) : (
          <>
            {
              // providers &&
              // Object.values(providers).map((provider) => (
              <button
                className="black_btn"
                type="button"
                key={111}
                onClick={async () => {
                  router.push("/login");
                }}
              >
                Sign In
              </button>
              // ))
            }
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {userData?.userId ? (
          <div className="flex">
            <div
              className="cursor-pointer"
              onClick={() => setToggleDropdown((prevState) => !prevState)}
            >
              {userData?.username}
            </div>

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  className="mt-5 w-full black_btn"
                  type="button"
                  onClick={signOut}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {
              //providers &&
              // Object.values(providers).map((provider) => (
              <button
                className="black_btn"
                type="button"
                key={111}
                onClick={async () => {
                  router.push("/login");
                }}
              >
                Sign In
              </button>
              // ))
            }
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
