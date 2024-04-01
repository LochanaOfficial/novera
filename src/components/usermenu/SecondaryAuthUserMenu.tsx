"use client";

import { AiOutlineMenu } from "react-icons/ai";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import MenuItem from "@/app/components/navbar/MenuItem";
import { ChevronLeft, Gem, Handshake, LogOut, Moon, Settings, Sun, UserRound } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Avatar from "@/app/components/Avatar";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";
import { useClerk, useUser } from "@clerk/nextjs";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";


interface SecondaryAuthUserMenuProps {
  currentUser?: User | null;
}

const SecondaryAuthUserMenu: React.FC<SecondaryAuthUserMenuProps> = ({
    currentUser,
}) => {
    const router = useRouter();
    const {theme, setTheme} = useTheme();
    const ref = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenTheme, setIsOpenTheme] = useState(false);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const handleClick = () => {
        setIsOpenTheme(false);
        setIsOpen(true);
    };

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const isOpenThemeToggle = useCallback(() => {
        setIsOpenTheme(true);
        setIsOpen(false);
    }, []);

    const isBackThemeToggle = useCallback(() => {
        setIsOpenTheme(false);
        setIsOpen(true);
    }, []);

    useEffect(() => {
        function handleOutsideClick(event: MouseEvent) {
          if (!event.target) return;
          if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsOpen(false);
            setIsOpenTheme(false);
          }
        }
    
        document.addEventListener("mousedown", handleOutsideClick);
    
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [ref]);

    const { user } = useUser();
    const { signOut } = useClerk();
   
    
  return (
    <div className="relative">
        <div className="flex flex-row items-center gap-3">
        <div
                onClick={toggleOpen}
                className="p-4 md:py-1 hidden md:flex md:px-1 md:pl-2 border-[1px] border-neutral-200 
                            flex-row items-center gap-3 rounded-full cursor-pointer
                           hover:shadow-md transition dark:border-neutral-600"
            >
                <AiOutlineMenu />           
                <div className="hidden md:block">
                    <Avatar src={user?.imageUrl} />
                </div>
        </div>
        

        <Sheet>
        <SheetTrigger className="md:hidden hover:opacity-75 transition bg-background">
            <div
                    onClick={() => {}}
                    className="p-4 md:py-1 md:hidden flex md:px-1 md:pl-2 border-[1px] border-neutral-200 
                                flex-row items-center gap-3 rounded-full cursor-pointer
                            hover:shadow-md transition dark:border-neutral-600"
                >
                    <AiOutlineMenu />           
                    <div className="hidden md:block">
                        <Avatar src={user?.imageUrl} />
                    </div>
            </div>
        </SheetTrigger>
        <SheetClose>
            <SheetContent side="right" className="p-0 bg-white w-[300px] dark:bg-neutral-950">
               <div className="p-4">
                 <Avatar src={user?.imageUrl} />
               </div>
               <div className="mt-2 cursor-pointer">
                  <div className="w-full flex items-center hover:bg-neutral-900 p-4 font-semibold space-x-2">
                    <div>
                        <UserRound className="w-5 h-5" />
                    </div>
                    <div>My Profile</div>
                  </div>
                  <div onClick={() => router.push("/agency")} className="w-full flex items-center hover:bg-neutral-900 p-4 font-semibold space-x-2">
                    <div>
                        <Handshake className="w-5 h-5" />
                    </div>
                    <div>Agency Page</div>
                  </div>
                  <div className="w-full flex items-center hover:bg-neutral-900 p-4 font-semibold space-x-2">
                    <div>
                        <Handshake className="w-5 h-5" />
                    </div>
                    <div>Your Customers</div>
                  </div>

                  <div className="w-full flex items-center hover:bg-neutral-900 p-4 font-semibold space-x-2">
                    <div>
                        <Gem className="w-5 h-5" />
                    </div>
                    <div>Your Revenue</div>
                  </div>

                  <div className="w-full flex items-center hover:bg-neutral-900 p-4 font-semibold space-x-2">
                    <div>
                        <Settings className="w-5 h-5" />
                    </div>
                    <div>Settings And Themes</div>
                  </div>
                  <div  onClick={() => signOut(() => { router.push("/site"); window.location.reload(); })} className="w-full flex items-center hover:bg-neutral-900 p-4 font-semibold space-x-2">
                    <div>
                        <LogOut className="w-5 h-5" />
                    </div>
                    <div>Logout</div>
                  </div>
               </div>
            </SheetContent>
        </SheetClose>
    </Sheet>

        </div>
        {isOpen && (
            <div ref={ref} className="absolute rounded-xl dark:border dark:border-slate-900 shadow-md w-[40vw] md:w-[200px] bg-white dark:bg-slate-950 overflow-hidden right-0 top-12 text-sm">
                <div className="flex flex-col cursor-pointer">
                    {user ? (
                        <>
                        <MenuItem
                            onClick={() => {}}
                            label="My Profile"
                        />
                        <MenuItem
                            onClick={() => router.push("/agency")}
                            label="Agency Page"
                        />
                        <MenuItem
                            onClick={isOpenThemeToggle}
                            label="Change Theme"
                        />
                        <hr />
                        <MenuItem
                            onClick={() => signOut(() => { router.push("/site"); window.location.reload(); })}
                            label="Logout"
                        />
                    </>
                    ) : (
                        <>
                        <MenuItem
                            onClick={() => router.push("/agency/sign-in")}
                            label="Login"
                        />
                        <MenuItem
                            onClick={() => router.push("/agency/sign-up")}
                            label="Sign Up"
                        />
                        <MenuItem
                            onClick={isOpenThemeToggle}
                            label="Change Theme"
                        />
                    </>
                    )}
                </div>
            </div>
        )}
        {isOpenTheme && (
            
                <>
                  <div ref={ref} className="absolute rounded-xl dark:border dark:border-slate-900 shadow-md w-[40vw] md:w-[240px] bg-white dark:bg-slate-950 overflow-hidden right-0 top-12 flex items-center flex-col">
                    <div className="flex items-center w-full px-2 py-3">
                        <ChevronLeft size={18} onClick={isBackThemeToggle} className="cursor-pointer" />
                        <p className="font-bold ml-1">Switch appearance</p>
                        {theme === "dark" ? (
                        <Moon size={20} className="ml-auto" />
                        ) : (
                        <Sun size={20} className="ml-auto" />
                        )}
                    </div>
                    <hr className="w-full" />
                    <div className="w-full flex justify-center p-2">
                        <Label htmlFor="dark-mode" className="dark:hover:bg-slate-900 hover:bg-slate-50 h-full items-center cursor-pointer w-full px-3 py-3 rounded-xl flex justify-between">
                            <div>
                                {theme === "light" ? "Light Mode" : "Dark Mode"}
                            </div>
                            <div className="flex h-full items-center">
                            <Switch
                                id="dark-mode"
                                className="ml-auto"
                                checked={theme === "dark"}
                                onCheckedChange={(checked) => {
                                    setTheme(checked ? "dark" : "light");
                                }}
                            />
                            </div>
                        </Label>
                    </div>
                  </div>
                </> 
        )}
    </div>
  )
}

export default SecondaryAuthUserMenu;