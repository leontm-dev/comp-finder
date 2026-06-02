import { Search, Star } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Black_Ops_One } from "next/font/google";
import Link from "next/link";

type Props = {
  className?: HTMLDivElement["className"];
};
const blackOpsOne = Black_Ops_One({ weight: "400" });
export function Navbar(props: Props) {
  return (
    <nav
      className={cn(
        "flex w-full flex-row items-center justify-between px-2 py-4",
        props.className,
      )}
    >
      <h2 className={cn(blackOpsOne.className, "text-xl font-bold")}>
        Comb finder
      </h2>
      <div className="flex flex-row items-center gap-2">
        <Link href={"https://github.com"}>
          <Button variant={"secondary"}>
            <Star />
          </Button>
        </Link>
        <Link href={"/find"}>
          <Button>
            <Search /> Find
          </Button>
        </Link>
      </div>
    </nav>
  );
}
