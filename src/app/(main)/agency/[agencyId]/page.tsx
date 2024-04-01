import { getAgencyDetails } from "@/lib/queries";

const Page = async({params} : {params: { agencyId: string }}) => {
  const agencyData = await getAgencyDetails(params.agencyId);
  return (
    <div className="flex flex-col">
      <div>Name - {agencyData?.name}</div>
      <div>Address -{agencyData?.address}</div>
      <div>City - {agencyData?.city}</div>
      <div>State - {agencyData?.state}</div>
      <div>Email - {agencyData?.companyEmail}</div>
      <div>Phone - {agencyData?.companyPhone}</div>
      <div>Country - {agencyData?.country}</div>
      <div>Created At - {agencyData?.createdAt.toString()}</div>
      <div>UpdatedAt - {agencyData?.updatedAt.toString()}</div>
    </div>
  )
}

export default Page;