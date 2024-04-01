"use client";

import { NotificationWithUser } from "@/lib/types";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import RoundedAuthUserMenu from "../usermenu/RoundedAuthUserMenu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Bell } from "lucide-react";
import { Role } from "@prisma/client";
import { Card } from "../ui/card";
import { Switch } from "../ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ModeToggle } from "@/app/components/mode-toggle";

type Props = {
    notifications: NotificationWithUser | []
    role?: Role
    className?: string
    subAccountId?: string
}

const InfoBar = ({
    notifications,
    role,
    className,
    subAccountId,
} : Props) => {
    const [allNotifications, setAllNotification] = useState(notifications);
    const [showAll, setShowAll] = useState(true);

    const handleClick = () => {
        if (!showAll) {
            setAllNotification(notifications)
        } else {
            if (notifications?.length !== 0) {
                setAllNotification(
                    notifications?.filter((item) => item.subAccountId === subAccountId) ??
                    []
                )
            }
        }
        setShowAll((prev) => !prev)
    }

  return (
    <>
        <div className={twMerge("fixed z-[20] md:left-[300px] left-0 right-0 top-0 px-4 md:py-4 py-1 bg-background/80 backdrop-blur-md flex gap-4 items-center border-b-[1px]", className)}>
            <div className="flex items-center gap-2 ml-auto">
                <RoundedAuthUserMenu />
                <Sheet>
                    <SheetTrigger>
                        <div className="rounded-full w-9 h-9 bg-primary flex items-center justify-center text-white">
                            <Bell size={18} />
                        </div>
                    </SheetTrigger>
                    <SheetContent className="flex flex-col">
                        <SheetHeader className="text-left">
                            <SheetTitle>Notifications</SheetTitle>
                            <SheetDescription>
                                {(role === "AGENCY_ADMIN" || role === "AGENCY_OWNER") && (
                                    <Card className="flex items-center justify-between p-4">
                                        Current Subaccount
                                        <Switch onChangeCapture={handleClick} />
                                    </Card>
                                )} 
                            </SheetDescription>
                        </SheetHeader>
                        {allNotifications?.map((notification) => (
                            <div
                                key={notification.id}
                                className="flex flex-col gap-y-2 mb-2 overflow-x-scroll text-ellipsis"
                            >
                                <div className="flex gap-2">
                                    <Avatar>
                                        <AvatarImage
                                            src={notification.User.avatarUrl}
                                            alt="Profile Picture"
                                        />
                                        <AvatarFallback className="bg-primary">
                                            {notification.User.name.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <p>
                                            <span className="font-bold">
                                                {notification.notification.split("|")[0]}
                                            </span>
                                            <span className="text-muted-foreground">
                                                {notification.notification.split("|")[1]}
                                            </span>
                                            <span className="font-bold">
                                                {notification.notification.split("|")[2]}
                                            </span>
                                        </p>
                                        <small className="text-xs text-muted-foreground">
                                            {new Date(notification.createdAt).toLocaleDateString()}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {allNotifications?.length === 0 && (
                            <div className="flex items-center justify-center mb-4 text-muted-foreground">
                                You Have No Notifications
                            </div>
                        )}
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    </>
  )
}


export default InfoBar;