import { Search, Star } from "lucide-react";
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
      <h2 className={cn(blackOpsOne.className, "text-2xl font-bold")}>
        Comb finder
      </h2>
      <div className="flex flex-row items-center gap-2">
        {props.showToggle && <ModeToggle />}
        <Link href={"https://github.com/leontm-dev/comb-finder-frontend"}>
          <Button variant={"ghost"} size={"icon-lg"}>
            <HugeiconsIcon icon={GithubIcon} />
          </Button>
        </Link>
        <Link href={"/find"}>
          <Button variant={props.buttonVariant || "default"} size={"lg"}>
            <Search /> Find
          </Button>
        </Link>
      </div>
    </nav>
  );
}
