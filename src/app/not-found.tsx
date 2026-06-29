import { Footer } from "@/components/base-layout/footer";
import { Navbar } from "@/components/base-layout/navbar";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 | comp finder",
  description: "We didn't find what you were looking for",
  robots: {
    index: false,
    follow: false,
  },
};
export default async function NotFoundPage() {
  const headersList = await headers();
  const url = new URL(headersList.get("referer") || "");

  return (
    <div className="flex max-w-screen flex-col gap-4">
      <main className="flex h-screen flex-col items-center justify-center">
        <Navbar className="absolute top-0 left-0" />
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-primary text-8xl font-extrabold select-none lg:text-[180px]">
            404 <span className="-ml-2 text-xl">{url.pathname}</span>
          </h1>
          <p className="lg:text-md mt-0 text-center text-sm lg:-mt-3.75">
            We could not find the page you are looking for
          </p>
          <div className="flex flex-row flex-wrap items-center gap-2">
            <Link href={"/"}>
              <Button>Go back to home</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
