import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { GithubIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function Footer() {
  return (
    <footer className="flex w-full flex-row items-center justify-center gap-2 px-2 py-4">
      <p className="flex flex-row items-center gap-2 text-xs">
        Made with <Heart className="size-4" /> by{" "}
        <Link href={"https://github.com/leontm-dev"}>LeonTM</Link>
      </p>
      <Link href={"https://github.com"}>
        <Button variant={"ghost"}>
          <HugeiconsIcon icon={GithubIcon} />
        </Button>
      </Link>
    </footer>
  );
}
