"use client";

import { ModeToggle } from "@/app/components/mode-toggle";
import UserMenu from "@/app/components/navbar/UserMenu";
import useLoginModal from "@/app/hooks/useLoginModal";
import SecondaryAuthUserMenu from "@/components/usermenu/SecondaryAuthUserMenu";
import { UserButton, useUser } from "@clerk/nextjs";
import { User } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type Props = {
    currentUser?: null | User;
}

const Navigation = ({currentUser }: Props) => {
    const router = useRouter();
    const {user} = useUser();
  return (
    <div className="fixed top-0 right-0 left-0 py-4 md:px-4 flex items-center justify-between z-30 bg-background">
    <aside className="flex items-center gap-3 pl-3.5">
      <Image
        src={'/assets/icon.png'}
        width={40}
        height={40}
        alt="plur logo"
        className=""
      />
      <span className="text-xl font-black font-poppins text-neutral-300 md:text-neutral-200"> Novera</span>
    </aside>
    <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
      <ul className="flex items-center justify-center gap-8">
        <Link href={'#'}>Pricing</Link>
        <Link href={'#'}>About</Link>
        <Link href={'#'}>Documentation</Link>
        <Link href={'#'}>Features</Link>
      </ul>
    </nav>
    <aside className="flex gap-0 items-center">
        <Link href={"/agency"}
              className={clsx("bg-primary text-white p-2 px-4 mr-3 rounded-md hover:bg-primary/80", {
                "bg-transparent !rounded-full py-2.5 border mr-0 border-neutral-800 hover:bg-transparent": user
              })}
        >
            {user ? "Dashboard" : "Login"}
        </Link>
        {user && (
            <SecondaryAuthUserMenu />
        )}
    </aside>
  </div>
  )
}

export default Navigation;