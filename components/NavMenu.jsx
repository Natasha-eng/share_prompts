"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NavMenu = ({ user, signOut }) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const router = useRouter();

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden sm:flex!">
        {user?.username ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={async () => signOut()}
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href="/profile">{user?.username}</Link>
          </div>
        ) : (
          <>
            {
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
            }
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="relative sm:hidden">
        {user?.username ? (
          <div className="flex">
            <div
              className="cursor-pointer"
              onClick={() => setToggleDropdown((prevState) => !prevState)}
            >
              {user?.username}
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
                  onClick={async () => {
                    await signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {
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
            }
          </>
        )}
      </div>
    </>
  );
};

export default NavMenu;
