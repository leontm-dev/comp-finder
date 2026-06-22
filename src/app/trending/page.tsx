import { Navbar } from "@/components/base-layout/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { TrendingCustomizerForm } from "./customizer";
import { Footer } from "@/components/base-layout/footer";

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
