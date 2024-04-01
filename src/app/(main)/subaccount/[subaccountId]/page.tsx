import { currentUser } from "@clerk/nextjs"

type Props = {
    params: { subaccountId:string }
}

const SubaccountPageId = async({
    params,
} : Props) => {
  return (
    <div>

    </div>
  )
}

export default SubaccountPageId;