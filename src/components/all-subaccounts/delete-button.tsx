"use client";

import { deleteSubAccount, getSubaccountDetails, saveActivityLoginNotification } from "@/lib/queries";
import { useRouter } from "next/navigation";

type Props = {
    subAccountId: string
}

const DeleteButton = ({
    subAccountId,
} : Props) => {
    const router = useRouter();

  return (
    <div onClick={async () => {
        const response = await getSubaccountDetails(subAccountId)
        await saveActivityLoginNotification({
            agencyId: undefined,
            description: `Deleted A Subaccount | ${response?.name}`,
            subaccountId: subAccountId,
        })
        await deleteSubAccount(subAccountId)
        router.refresh();
    }}>
        Delete Sub Account
    </div>
  )
}


export default DeleteButton;