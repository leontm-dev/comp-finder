import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { GithubIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function Footer() {
  return (
    <footer className="flex w-full flex-row items-center justify-center gap-4 px-2 py-4">
      <p className="flex flex-row items-center gap-2 text-xs">
        Made with <Heart className="size-4 fill-pink-700" /> by{" "}
        <Link href={"https://github.com/leontm-dev"}>LeonTM</Link>
      </p>
      <Link href={"https://github.com"}>
        <Button variant={"ghost"} size="icon">
          <HugeiconsIcon icon={GithubIcon} />
        </Button>
      </Link>
      <a href="https://www.netlify.com" className="h-8">
        {/*  eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="h-8"
          src="https://www.netlify.com/assets/badges/netlify-badge-color-accent.svg"
          alt="Deploys by Netlify"
        />
      </a>
    </footer>
  );
}
