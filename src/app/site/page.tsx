"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { pricingCards } from "@/lib/constance";
import clsx from "clsx";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="h-full w-full pt-36 relative flex items-center justify-center flex-col">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#2b2828_1px,transparent_1px),linear-gradient(to_bottom,#2b2828_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />
        <p className="text-slate-400 text-center -mt-[250px] md:mt-[390px] md:-mb-6">Run Your Agency In One Place</p>
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className="text-8xl font-black text-center md:text-[200px] xl:text-[300px]">
            Novera
          </h1>
        </div>
        <div className="flex justify-center items-center relative md:mt-[-40px]">
          <Image
            src={"/assets/preview.png"}
            alt="banner image"
            height={1200}
            width={1200}
            className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"
          />
          <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
        </div>
      </section>
      <section className="flex justify-center items-center flex-col gap-4 -mt-[150px] md:mt-[480px]">
        <h2 className="text-4xl text-center font-black font-poppins">Choose What Fits You Right</h2>
        <p className="text-muted-foreground text-center">
          Our Straightforward Pricing Plans Are Tailored To Meet Your Needs. If
          {" You're"} Not <br />
          Ready To Commit You Can Get Started For Free
        </p>
        <div className="flex justify-center gap-4 flex-wrap mt-6">
          {pricingCards.map((card) => (
            // WIP: Wire Up From Product From Stripe
            <Card key={card.title}
                  className={clsx("w-[300px] flex flex-col justify-between", 
                  {"border-2 border-primary": card.title==="Unlimited Saas"})}
            >
              <CardHeader className="">
                <CardTitle className={clsx("", {
                  "text-muted-foreground": card.title !== "Unlimited Saas"
                })}>
                  {card.title}
                </CardTitle>
                <CardDescription>
                  {card.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="">
                <span className="text-4xl font-black">{card.price}</span>
                  <span>/m</span>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4 h-[210px]">
                <div className="">{card.features.map((feature) => (
                  <div 
                    key={feature}
                    className="flex gap-2 items-center"
                  >
                    <Check className="text-muted-foreground w-4 h-4" />
                    <p className="text-neutral-400 text-[16px]">{feature}</p>
                  </div>
                ))}
                </div>
                <div className="flex w-full h-full items-end">
                  <Link href={`/agency?plan=${card.priceId}`}
                        className={clsx(
                          "w-full text-center flex items-center justify-center font-normal bg-primary p-2 rounded-md h-[42px]",
                          { "!bg-muted-foreground": card.title !== "Unlimited Saas" }
                        )}
                  >
                    Get Started
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      <section className="p-8">

      </section>
    </>
  );
}
