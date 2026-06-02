import { Footer } from "@/components/base-layout/footer";
import { Navbar } from "@/components/base-layout/navbar";
import DotGrid from "@/components/DotGrid";
import { Button } from "@/components/ui/button";
import { Search, Star } from "lucide-react";
import { Black_Ops_One } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Metadata } from "next";

const blackOpsOne = Black_Ops_One({ weight: "400" });

export const metadata: Metadata = {
  title: "Comb finder",
};
export default function Home() {
  return (
    <div className="relative flex max-w-screen flex-col">
      <main className="flex h-screen flex-col items-center justify-center">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#2F293A"
          activeColor="#9f0712"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
        <Navbar className="absolute top-0 left-0" />
        <div className="absolute flex flex-col items-center justify-center gap-2 bg-white/70 p-8 dark:bg-black/10">
          <h1 className={cn("text-6xl font-bold", blackOpsOne.className)}>
            Find pro-teams that play your comb
          </h1>
          <p>
            Search a dozen games on vlr.gg to find tier 1 pro-teams that play
            exactly your comb
          </p>
          <div className="flex flex-row flex-wrap items-center gap-2">
            <Link href={"https://github.com"}>
              <Button variant={"secondary"}>
                <Star /> on GitHub
              </Button>
            </Link>
            <Link href={"/find"}>
              <Button>
                <Search /> Start
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
