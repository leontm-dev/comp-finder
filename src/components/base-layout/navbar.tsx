import { Search, Sparkles } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import cn from "cnfast";
import { Black_Ops_One } from "next/font/google";
import Link from "next/link";
import { VariantProps } from "class-variance-authority";
import { HugeiconsIcon } from "@hugeicons/react";
import { GithubIcon } from "@hugeicons/core-free-icons";
import { ModeToggle } from "../mode-toggle";

type Props = {
  className?: HTMLDivElement["className"];
  buttonVariant?: VariantProps<typeof buttonVariants>["variant"];
  showToggle?: boolean;
  textClassName?: HTMLParagraphElement["className"];
};
const blackOpsOne = Black_Ops_One({ weight: "400" });
export function Navbar(props: Props) {
  return (
    <nav
      className={cn(
        "flex w-full flex-row items-center justify-between px-4 py-4",
        props.className,
      )}
    >
      <Link href={"/"}>
        <h2
          className={cn(
            blackOpsOne.className,
            "text-2xl font-bold hover:cursor-pointer",
            props.textClassName,
          )}
        >
          Comb finder
        </h2>
      </Link>
      <div className="flex flex-row items-center gap-2">
        {props.showToggle && <ModeToggle />}
        <Link href={"https://github.com/leontm-dev/comb-finder-frontend"}>
          <Button variant={"link"} size={"icon-lg"}>
            <HugeiconsIcon icon={GithubIcon} />
          </Button>
        </Link>
        <Link href={"/trending"}>
          <Button variant={"secondary"}>
            <Sparkles /> Trending
          </Button>
        </Link>
        <Link href={"/find"}>
          <Button variant={props.buttonVariant || "default"}>
            <Search /> Find
          </Button>
        </Link>
      </div>
    </nav>
  );
}
