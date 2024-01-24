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
    <nav className="flex-between w-full mb-16 pt-3">
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
    </nav>
  );
};

export default Nav;
