import { User } from "@prisma/client";
import Container from "../Container";
import { ModeToggle } from "../mode-toggle";
import UserMenu from "./UserMenu";
import React from "react";

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser
}) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm dark:bg-slate-950">
        <div className="py-4 border-b-[1px]">
            <Container>
                <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                    <div>Novera</div>
                    <UserMenu currentUser={currentUser} />
                </div>
            </Container>
        </div>
    </div>
  )
}

export default Navbar;