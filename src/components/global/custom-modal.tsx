"use client"

import { useModal } from "@/providers/modal-provider"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { ScrollArea } from "../ui/scroll-area"
import { X } from "lucide-react"

type Props = {
    title: string
    subheading: string
    children: React.ReactNode
    defaultOpen?: boolean
}

const CustomModal = ({
    title,
    subheading,
    children,
    defaultOpen,
} : Props) => {
    const { isOpen, setClose } = useModal();
    return ( 
        <Dialog
            open={isOpen || defaultOpen}
            onOpenChange={setClose}
        >
            <DialogContent
                className="bg-card"
            >
                <DialogHeader className="md:pt-4 text-left relative py-4">
                
                <ScrollArea className="md:h-[500px] h-screen w-[480px] pr-5 rounded-md">
                <DialogClose className="block md:hidden">
                    <X className="w-5 h-5 mt-6" />
                </DialogClose>
                    <DialogTitle className="text-2xl font-bold mt-5 md:mt-0">
                        {title}
                    </DialogTitle>
                    <DialogDescription className="mb-4">
                        {subheading}
                    </DialogDescription>
                    {children}
                </ScrollArea>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default CustomModal;