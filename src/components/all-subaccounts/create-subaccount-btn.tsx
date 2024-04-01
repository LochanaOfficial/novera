import { useModal } from "@/providers/modal-provider";
import { Agency, AgencySidebarOption, SubAccount, User } from "@prisma/client";
import { Button } from "../ui/button";
import { twMerge } from "tailwind-merge";

type Props = {
    user: User & {
        Agency:
          | (
              | Agency
              | (null & {
                  SubAccount: SubAccount[]
                  SideBarOption: AgencySidebarOption[]
                })
            )
          | null
      }
      id: string
      className: string
}

const CreateSubaccountButton = ({
    user,
    id,
    className,
} : Props) => {
    const { setOpen } = useModal();
    const agencyDetails = user.Agency

    if (!agencyDetails) return

  return (
    <Button className={twMerge("w-full flex gap-4", className)}>
        
    </Button>
  )
}


export default CreateSubaccountButton;