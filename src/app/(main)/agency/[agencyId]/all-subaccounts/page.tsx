import CreateSubaccountButton from "@/components/all-subaccounts/create-subaccount-btn";
import DeleteButton from "@/components/all-subaccounts/delete-button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { getAuthUserDetails } from "@/lib/queries";
import { SubAccount } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: { agencyId: string }
}

const AllSubaccountPage = async({
  params,
} : Props) => {
  const user = await getAuthUserDetails();
  if (!user) {
    return;
  }


  return (
    <AlertDialog>
      <div className="flex flex-col">
        {/* <CreateSubaccountButton  /> */}
        <Command className="rounded-lg bg-transparent">
          <CommandInput placeholder="Search Account" />
          <CommandList>
            <CommandEmpty>No Result Found</CommandEmpty>
            <CommandGroup heading="Sub Account">
              {!!user.Agency?.SubAccount.length ? user.Agency.SubAccount.map((subaccount: SubAccount) => 
              <CommandItem
                key={subaccount.id}
                className="h-32 !bg-background my-2 text-primary border-[1px] border-border p-4 rounded-lg hover:!bg-background cursor-pointer transition-all"
              >
                <Link
                  href={`/subaccount/${subaccount.id}`}
                  className="flex gap-4 w-full h-full"
                >
                  <div className="relative w-32">
                    <Image
                      src={subaccount.subAccountLogo}
                      alt="Subaccount Logo"
                      fill
                      className="rounded-md object-contain bg-muted/50 p-4"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col">
                      {subaccount.name}
                      <span className="text-muted-foreground text-xs">
                        {subaccount.address}
                      </span>
                    </div>
                  </div>
                </Link>
                <AlertDialogTrigger asChild>
                  <Button
                    size={"sm"}
                    variant={"destructive"}
                    className="text-red-600 w-20 hover:bg-red-600 hover:text-white"
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-left">
                      Are You Absolute Sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-left">
                      This Action Cannot Be Undon. This Will Be Delete Your Subaccount And All Data Related To The Subaccount
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex items-center">
                    <AlertDialogCancel className="">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 hover:bg-opacity-60 hover:bg-red-600">
                      <DeleteButton subAccountId={subaccount.id} />
                    </AlertDialogAction>
                  </AlertDialogFooter>
                  <AlertDialogTrigger>
                  </AlertDialogTrigger>
                </AlertDialogContent>
              </CommandItem>) : (
                <div className="text-muted-foreground text-center p-4">
                  No Sub Accounts
                </div>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </AlertDialog>
  )
}

export default AllSubaccountPage;