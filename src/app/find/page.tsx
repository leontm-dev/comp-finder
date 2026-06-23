import { Footer } from "@/components/base-layout/footer";
import { Navbar } from "@/components/base-layout/navbar";
import { CombFinderSelectionComponent } from "./finder";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find | comb-finder",
  description:
    "Find teams that play exactly your combs or simply your favorite agents",
  robots: { index: true, follow: true },
  authors: [{ name: "LeonTM", url: "https://leontm.me" }],
  creator: "LeonTM",
  category: "VALORANT",
  keywords: [
    "valorant",
    "vlr.gg",
    "combs",
    "pros",
    "vct",
    "masters",
    "champion",
    "comb",
    "agent",
    "agents",
    "jett",
    "reyna",
    "filters",
  ],
};
export default function FindPage() {
  return (
    <div className="relative flex max-w-screen flex-col">
      <main className="flex min-h-screen w-full flex-col items-center lg:h-screen">
        <Navbar showToggle />
        <div className="px-2 md:px-4 lg:px-6 xl:px-8">
          <Suspense
            fallback={<Skeleton className="h-full w-full rounded-none" />}
          >
            <CombFinderSelectionComponent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
