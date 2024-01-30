import Image from "next/image";
import Link from "next/link";

import { auth, signOut } from "@app/auth";
import NavMenu from "./NavMenu";

const Nav = async () => {
  const userData = await auth();
  const user = userData?.user ? userData.user : null;

  const signOutHandler = async () => {
    "use server";
    await signOut();
  };

  return (
    <nav className="nav bg-stone-400 z-20 fixed left-0 w-screen pb-8 pt-8 sm:px-16 px-6">
      <div className="flex-between m-auto max-w-[71rem]">
        <Link href="/" className="flex gap-2 flex-center">
          <Image
            alt="Prompt logo"
            src="/images/logo.svg"
            width={30}
            height={30}
            className="object-contain"
          />
          <p className="logo_text">Share Events</p>
        </Link>
        <NavMenu user={user} signOut={signOutHandler} />
      </div>
    </nav>
  );
};

export default Nav;
