import { Navbar } from "@/components/base-layout/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { TrendingCustomizerForm } from "./customizer";
import { Footer } from "@/components/base-layout/footer";
import { Metadata } from "next";

export const metdata: Metadata = {
  title: "Trending | comp-finder",
  description: "Discover the next comp your team has to try",
  robots: { index: true, follow: true },
  authors: [{ name: "LeonTM", url: "https://leontm.me" }],
  creator: "LeonTM",
  category: "VALORANT",
  keywords: [
    "valorant",
    "vlr.gg",
    "comps",
    "pros",
    "vct",
    "masters",
    "champion",
    "comp",
    "agent",
    "agents",
    "jett",
    "reyna",
    "trends",
    "custom",
  ],
};
export default function TrendingPage() {
  return (
    <div className="relative flex max-w-screen flex-col">
      <main className="flex w-full flex-col items-center">
        <Navbar showToggle />
        <div className="relative flex h-full w-full grow-0 flex-col px-2 pb-4 md:px-4 lg:px-6 xl:px-8">
          <Suspense fallback={<Skeleton className="h-full w-full flex-1" />}>
            <TrendingCustomizerForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
