import { db } from "@/app/libs/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: {
    agencyId: string
  }
  searchParams: {
    code: string
  }
}

const LaunchPage = async({
  params,
  searchParams,
} : Props) => {
  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
  })

  if (!agencyDetails) return;

  const allDetailsExist = 
     agencyDetails.address &&
     agencyDetails.agencyLogo &&
     agencyDetails.city &&
     agencyDetails.companyEmail &&
     agencyDetails.companyPhone &&
     agencyDetails.country &&
     agencyDetails.name &&
     agencyDetails.state &&
     agencyDetails.zipCode

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full h-full max-w-[800px]">
        <Card className="border-none">
          <CardHeader>
            <CardTitle>
              Lets Get Started
            </CardTitle>
            <CardDescription>
              Follow The Steps Below To Get Your Account Setup.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex justify-between flex-col md:flex-row items-center w-full border p-4 rounded-lg gap-2">
              <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                <Image alt="App Logo" src="/appstore.png" height={80} width={80} className="rounded-md object-contain" />
                <p>Save The Website As A Shortcut On Your Mobile Device</p>
              </div>
              <div className="w-full md:w-[100px] justify-start md:justify-end flex">
                <Button className="w-[80px] mt-2 md:mt-0">Start</Button>
              </div>
            </div>
            <div className="flex justify-between flex-col md:flex-row items-center w-full border p-4 rounded-lg gap-2">
              <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                <Image alt="App Logo" src="/stripelogo.png" height={80} width={80} className="rounded-md object-contain" />
                <p>Connect Your Stripe Account To Accept Payments And See Your Dashboard</p>
              </div>
              <div className="w-full md:w-[100px] justify-start md:justify-end flex">
                <Button className="w-[80px] mt-2 md:mt-0">Start</Button>
              </div>
            </div>
            <div className="flex justify-between flex-col md:flex-row items-center w-full border p-4 rounded-lg gap-2">
              <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                <Image alt="App Logo" src={agencyDetails.agencyLogo} height={80} width={80} className="rounded-md object-contain" />
                <p>Fill In All Your Every Business Details Of Your Agency</p>
              </div>
              <div className="w-full md:w-[100px] justify-start md:justify-end flex">
                {allDetailsExist 
                   ? <CheckCircleIcon size={50} className="text-primary mt-2 md:mt-0 p-1 flex-shrink-0" /> 
                   :  <Link
                          className="bg-primary py-2 px-6 text-[14px] rounded-md text-white"
                          href={`/agency/${params.agencyId}/settings`}
                      >
                         Start
                     </Link>
                }
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


export default LaunchPage;