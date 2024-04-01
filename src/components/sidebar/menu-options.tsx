"use client";

import { Agency, AgencySidebarOption, SubAccount, SubAccountSidebarOption } from "@prisma/client"
import { useEffect, useMemo, useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { ChevronsUpDown, Compass, Menu, PlusCircleIcon } from "lucide-react";
import clsx from "clsx";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import { useModal } from "@/providers/modal-provider";
import CustomModal from "../global/custom-modal";
import SubAccountDetails from "../forms/subaccount-details";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { icons } from "@/lib/constance";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

type Props = {
    defaultOpen?: boolean
    subAccounts: SubAccount[]
    sidebarOpt: AgencySidebarOption[] | SubAccountSidebarOption[]
    sideBarLogo: string
    details: any
    user: any
    id: string
}

const MenuOptions = ({
    defaultOpen,
    subAccounts,
    sidebarOpt,
    sideBarLogo,
    details,
    user,
    id,
}: Props) => {
    const { setOpen, isOpen, setClose } = useModal();
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const openState = useMemo( 
        () => defaultOpen? {open: true} : {},
        [defaultOpen])

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return;
    }

  return (
    <Sheet
      modal={false}
      {...openState}
    >
         {!isOpen && (
            <SheetTrigger
                asChild
                className="absolute left-4 top-[17px] z-[100] md:!hidden flex"
            >
                <Button
                    variant="outline"
                    className="border-none"
                    size={'icon'}
                >
                    <Menu />
                </Button>
            </SheetTrigger>
         )}
        <SheetContent
            showX={!defaultOpen}
            side={"left"}
            className={clsx("bg-background backdrop:blur-xl fixed top-0 border-r-[1px] p-6",
                            {
                                "hidden md:inline-block z-0 w-[300px]" : defaultOpen,
                                "inline-block md:hidden z-[100] w-full" : !defaultOpen,
                            }
                      )}
        >
            <div>
                <AspectRatio ratio={16 / 5}> 
                    <Image
                      src={sideBarLogo}
                      alt="Sidebar Logo"
                      fill
                      className="rounded-md object-contain"
                    />
                </AspectRatio>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button className="w-full my-4 flex items-center justify-between py-8"
                                variant="ghost"
                        >
                            <div className="flex items-center text-left gap-2">
                                <Compass />
                                <div className="flex flex-col">
                                    {details.name}
                                    <span className="text-muted-foreground">
                                        {details.address}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <ChevronsUpDown
                                    size={16}
                                    className="text-muted-foreground"
                                />
                            </div>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 h-80 mt-4 z-[200]">
                        {
                            <Command className="rounded-lg">
                             <CommandInput placeholder="Search Accounts" />
                             <ScrollArea className="h-[180px] w-full rounded-md">
                             <CommandList className="pb-16 pr-2">
                                <CommandEmpty>No Results Found</CommandEmpty>
                                {(user?.role === 'AGENCY_OWNER' ||
                                user?.role === 'AGENCY_ADMIN') &&
                                user?.Agency && (
                                <CommandGroup heading="Agency">
                                    <CommandItem className="!bg-transparent my-2 text-primary broder-[1px] border-border p-2 rounded-md hover:!bg-muted cursor-pointer transition-all">
                                    {defaultOpen ? (
                                        <Link
                                            href={`/agency/${user?.Agency?.id}`}
                                            className="flex gap-4 w-full h-full"
                                        >
                                            <div className="relative w-16">
                                                <Image
                                                src={user?.Agency?.agencyLogo}
                                                alt="Agency Logo"
                                                fill
                                                className="rounded-md object-contain"
                                                />
                                            </div>
                                            <div className="flex flex-col flex-1">
                                                {user?.Agency?.name}
                                                <span className="text-muted-foreground">
                                                {user?.Agency?.address}
                                                </span>
                                            </div>
                                        </Link>
                                    ) : (
                                        <SheetClose asChild>
                                            <Link
                                                href={`/agency/${user?.Agency?.id}`}
                                                className="flex gap-4 w-full h-full"
                                            >
                                                <div className="relative w-16">
                                                <Image
                                                    src={user?.Agency?.agencyLogo}
                                                    alt="Agency Logo"
                                                    fill
                                                    className="rounded-md object-contain"
                                                />
                                                </div>
                                                <div className="flex flex-col flex-1">
                                                    {user?.Agency?.name}
                                                <span className="text-muted-foreground">
                                                    {user?.Agency?.address}
                                                </span>
                                                </div>
                                            </Link>
                                        </SheetClose>
                                    )}
                                    </CommandItem>
                                </CommandGroup>
                                )}
                                <CommandGroup heading="Accounts">
                                    {!!subAccounts ? subAccounts.map((subaccount) => (
                                      <CommandItem key={subaccount.id}>
                                        {defaultOpen ? (
                                        <Link
                                            href={`/subaccount/${subaccount.id}`}
                                            className="flex gap-4 w-full h-full"
                                        >
                                            <div className="relative w-16">
                                                <Image
                                                src={subaccount.subAccountLogo}
                                                alt="Account Logo"
                                                fill
                                                className="rounded-md object-contain"
                                                />
                                            </div>
                                            <div className="flex flex-col flex-1">
                                                {subaccount.name}
                                                <span className="text-muted-foreground">
                                                {subaccount.address}
                                                </span>
                                            </div>
                                        </Link>
                                    ) : (
                                        <SheetClose asChild>
                                            <Link
                                                href={`/subaccount/${subaccount.id}`}
                                                className="flex gap-4 w-full h-full"
                                            >
                                                <div className="relative w-16">
                                                <Image
                                                    src={subaccount.subAccountLogo}
                                                    alt="Account Logo"
                                                    fill
                                                    className="rounded-md object-contain"
                                                />
                                                </div>
                                                <div className="flex flex-col flex-1">
                                                    {subaccount.name}
                                                <span className="text-muted-foreground">
                                                    {subaccount.address}
                                                </span>
                                                </div>
                                            </Link>
                                        </SheetClose>
                                    )}
                                      </CommandItem>
                                    ))  
                                     : "No Account"}
                                </CommandGroup>
                             </CommandList>
                             </ScrollArea>
                             {(user?.role === "AGENCY_OWNER" || user?.role === "AGENCY_ADMIN") && (
                                <SheetClose>
                                    <Button 
                                    className="w-full flex gap-2 mt-4"
                                    onClick={() => {
                                        setOpen(
                                            <CustomModal
                                                title="Create A Subaccount"
                                                subheading="You Can Switch Between Your Agency Account And The Subaccount From The Sidebar"
                                            >
                                                <SubAccountDetails
                                                    agencyDetails={user?.Agency as Agency}
                                                    userId={user?.id as string}
                                                    userName={user?.name}
                                                />
                                            </CustomModal>
                                            )
                                    }}
                                    >
                                        <PlusCircleIcon size={16} />
                                        Create Sub Account
                                    </Button>
                                </SheetClose>
                             )}
                            </Command>
                        }
                    </PopoverContent>
                </Popover>
                <p className="text-muted-foreground text-xs mb-2">
                    Menu Links
                </p>
                <Separator className="mb-4" />
                <nav className="relative">
                    <Command className="rounded-lg overflow-visible bg-transparent">
                        <CommandInput placeholder="Search..." />
                        <CommandList className="py-4 overflow-visible">
                            <CommandEmpty>No Results Found</CommandEmpty>
                            <CommandGroup className="overflow-visible">
                                {sidebarOpt.map((sidebarOption) => {
                                    let val
                                    const result = icons.find(
                                        (icon) => icon.value === sidebarOption.icon
                                    )

                                    if (result) {
                                        val = <result.path />
                                    }

                                    const nameToLowerCase = sidebarOption.name.toLowerCase();
                                    const dashboardPage = sidebarOption.name === "Dashboard"

                                    const isActive = (pathname === sidebarOption.link || (!dashboardPage && pathname?.includes(sidebarOption.link)))

                                    return (
                                        <CommandItem key={sidebarOption.id} className={cn(
                                           "py-2 w-full hover:bg-muted/60 mb-0.5",
                                            isActive && "bg-primary font-bold hover:bg-primary"
                                        )}>
                                            <Link
                                                href={sidebarOption.link}
                                                className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px]"
                                            >
                                                <SheetClose className="rounded-md w-full flex items-center gap-2">
                                                  {val}
                                                  <span>{sidebarOption.name}</span>
                                                </SheetClose>
                                            </Link>
                                    </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </nav>
            </div>
        </SheetContent>
    </Sheet>
  )
}

export default MenuOptions;