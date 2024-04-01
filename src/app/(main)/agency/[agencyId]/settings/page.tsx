import { db } from "@/app/libs/db";
import AgencyDetails from "@/components/forms/agency-detailes";
import UserDetails from "@/components/forms/user-details";
import { auth, currentUser } from "@clerk/nextjs"

type Props = {
  params: {agencyId:string}
}

const SettingsPage = async({
  params,
} : Props) => {
  const authUser = await currentUser();
  if (!authUser) return null

  const userDetails = await db.user.findUnique({
    where: {
      email: authUser.emailAddresses[0].emailAddress,
    },
  })

  if (!userDetails) return null
  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
    include: {
      SubAccount: true,
    },
  })

  if (!agencyDetails) return null

  const subAccounts = agencyDetails.SubAccount;
  return (
    <div className="flex lg:!flex-row flex-col gap-4">
      <AgencyDetails data={agencyDetails} formType="edit" />
      <UserDetails
        type="agency"
        id={params.agencyId}
        subAccounts={subAccounts}
        userData = {userDetails}
      />
    </div>
  )
}


export default SettingsPage;