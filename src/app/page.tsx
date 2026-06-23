import { Footer } from "@/components/base-layout/footer";
import { Button } from "@/components/ui/button";
import { ExternalLink, Search, Star } from "lucide-react";
import { Black_Ops_One } from "next/font/google";
import { cn } from "cnfast";
import Link from "next/link";
import { Metadata } from "next";
import { HomepageBackground } from "@/components/homepageBackground";
import { TrendingCombResult } from "./trending/customizer/result";

const blackOpsOne = Black_Ops_One({ weight: "400" });

export const metadata: Metadata = {
  title: "Comb finder",
  description:
    "Comb finder is a service that analyses pro teams and most importantly their combs. Find teams that are playing exactly your comb or discover the most trending comb on a certain map.",
};
export default function Home() {
  return (
    <HomepageBackground
      contents={
        <div className="flex flex-col items-center justify-center gap-2">
          <h1
            className={cn(
              "text-center text-2xl font-bold text-white md:text-4xl xl:text-6xl",
              blackOpsOne.className,
            )}
          >
            Find pro-teams that play your comb
          </h1>
          <p className="md:text-md text-center text-sm text-white lg:text-lg">
            Search a dozen games on vlr.gg to find tier 1 pro-teams that play
            exactly your comb
          </p>
          <div className="flex flex-row flex-wrap items-center gap-2">
            <Link href={"https://github.com"}>
              <Button variant={"link"}>
                <Star /> on GitHub
              </Button>
            </Link>
            <Link href={"/find"}>
              <Button variant={"outline"}>
                <Search /> Start
              </Button>
            </Link>
          </div>
        </div>
      }
    >
      <div className="flex w-3/4 flex-row items-center justify-center gap-12 self-center px-4 py-12">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-0">
            <h3 className={cn("text-4xl", blackOpsOne.className)}>
              Trending combs
            </h3>
            <p>
              Explore the most trending combs from recent patches on your
              desired map.
            </p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Link href={"/trending"}>
              <Button variant={"outline"}>
                <ExternalLink /> Check them out
              </Button>
            </Link>
          </div>
        </div>
        <div className="no-scrollbar max-h-3/4 overflow-y-auto">
          <TrendingCombResult
            events={[
              {
                icon: "https://owcdn.net/img/692fc18a04f4a.png",
                id: "2765",
                name: "Valorant Masters London 2026",
              },
            ]}
            agents={[
              {
                icon: "https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/displayicon.png",
                name: "Gekko",
              },
              {
                icon: "https://media.valorant-api.com/agents/dade69b4-4f5a-8528-247b-219e5a1facd6/displayicon.png",
                name: "Fade",
              },
              {
                icon: "https://media.valorant-api.com/agents/5f8d3a7f-467b-97f3-062c-13acf203c006/displayicon.png",
                name: "Breach",
              },
              {
                icon: "https://media.valorant-api.com/agents/cc8b64c8-4b25-4ff9-6e7f-37b4da43d235/displayicon.png",
                name: "Deadlock",
              },
              {
                icon: "https://media.valorant-api.com/agents/b444168c-4e35-8076-db47-ef9bf368f384/displayicon.png",
                name: "Tejo",
              },
              {
                icon: "https://media.valorant-api.com/agents/f94c3b30-42be-e959-889c-5aa313dba261/displayicon.png",
                name: "Raze",
              },
              {
                icon: "https://media.valorant-api.com/agents/22697a3d-45bf-8dd7-4fec-84a9e28c69d7/displayicon.png",
                name: "Chamber",
              },
              {
                icon: "https://media.valorant-api.com/agents/601dbbe7-43ce-be57-2a40-4abd24953621/displayicon.png",
                name: "KAY/O",
              },
              {
                icon: "https://media.valorant-api.com/agents/6f2a04ca-43e0-be17-7f36-b3908627744d/displayicon.png",
                name: "Skye",
              },
              {
                icon: "https://media.valorant-api.com/agents/117ed9e3-49f3-6512-3ccf-0cada7e3823b/displayicon.png",
                name: "Cypher",
              },
              {
                icon: "https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/displayicon.png",
                name: "Sova",
              },
              {
                icon: "https://media.valorant-api.com/agents/7c8a4701-4de6-9355-b254-e09bc2a34b72/displayicon.png",
                name: "Miks",
              },
              {
                icon: "https://media.valorant-api.com/agents/1e58de9c-4950-5125-93e9-a0aee9f98746/displayicon.png",
                name: "Killjoy",
              },
              {
                icon: "https://media.valorant-api.com/agents/95b78ed7-4637-86d9-7e41-71ba8c293152/displayicon.png",
                name: "Harbor",
              },
              {
                icon: "https://media.valorant-api.com/agents/efba5359-4016-a1e5-7626-b1ae76895940/displayicon.png",
                name: "Vyse",
              },
              {
                icon: "https://media.valorant-api.com/agents/707eab51-4836-f488-046a-cda6bf494859/displayicon.png",
                name: "Viper",
              },
              {
                icon: "https://media.valorant-api.com/agents/eb93336a-449b-9c1b-0a54-a891f7921d69/displayicon.png",
                name: "Phoenix",
              },
              {
                icon: "https://media.valorant-api.com/agents/92eeef5d-43b5-1d4a-8d03-b3927a09034b/displayicon.png",
                name: "Veto",
              },
              {
                icon: "https://media.valorant-api.com/agents/41fb69c1-4189-7b37-f117-bcaf1e96f1bf/displayicon.png",
                name: "Astra",
              },
              {
                icon: "https://media.valorant-api.com/agents/9f0d8ba9-4140-b941-57d3-a7ad57c6b417/displayicon.png",
                name: "Brimstone",
              },
              {
                icon: "https://media.valorant-api.com/agents/0e38b510-41a8-5780-5e8f-568b2a4f2d6c/displayicon.png",
                name: "Iso",
              },
              {
                icon: "https://media.valorant-api.com/agents/1dbf2edd-4729-0984-3115-daa5eed44993/displayicon.png",
                name: "Clove",
              },
              {
                icon: "https://media.valorant-api.com/agents/bb2a4828-46eb-8cd1-e765-15848195d751/displayicon.png",
                name: "Neon",
              },
              {
                icon: "https://media.valorant-api.com/agents/7f94d92c-4234-0a36-9646-3a87eb8b5c89/displayicon.png",
                name: "Yoru",
              },
              {
                icon: "https://media.valorant-api.com/agents/df1cb487-4902-002e-5c17-d28e83e78588/displayicon.png",
                name: "Waylay",
              },
              {
                icon: "https://media.valorant-api.com/agents/569fdd95-4d10-43ab-ca70-79becc718b46/displayicon.png",
                name: "Sage",
              },
              {
                icon: "https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/displayicon.png",
                name: "Reyna",
              },
              {
                icon: "https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/displayicon.png",
                name: "Omen",
              },
              {
                icon: "https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/displayicon.png",
                name: "Jett",
              },
            ]}
            maps={[
              {
                icon: "https://media.valorant-api.com/maps/7eaecc1b-4337-bbf6-6ab9-04b8f06b3319/listviewicon.png",
                name: "Ascent",
              },
              {
                icon: "https://media.valorant-api.com/maps/d960549e-485c-e861-8d71-aa9d1aed12a2/listviewicon.png",
                name: "Split",
              },
              {
                icon: "https://media.valorant-api.com/maps/b529448b-4d60-346e-e89e-00a4c527a405/listviewicon.png",
                name: "Fracture",
              },
              {
                icon: "https://media.valorant-api.com/maps/2c9d57ec-4431-9c5e-2939-8f9ef6dd5cba/listviewicon.png",
                name: "Bind",
              },
              {
                icon: "https://media.valorant-api.com/maps/2fb9a4fd-47b8-4e7d-a969-74b4046ebd53/listviewicon.png",
                name: "Breeze",
              },
              {
                icon: "https://media.valorant-api.com/maps/224b0a95-48b9-f703-1bd8-67aca101a61f/listviewicon.png",
                name: "Abyss",
              },
              {
                icon: "https://media.valorant-api.com/maps/2fe4ed3a-450a-948b-6d6b-e89a78e680a9/listviewicon.png",
                name: "Lotus",
              },
              {
                icon: "https://media.valorant-api.com/maps/92584fbe-486a-b1b2-9faa-39b0f486b498/listviewicon.png",
                name: "Sunset",
              },
              {
                icon: "https://media.valorant-api.com/maps/fd267378-4d1d-484f-ff52-77821ed10dc2/listviewicon.png",
                name: "Pearl",
              },
              {
                icon: "https://media.valorant-api.com/maps/e2ad5c54-4114-a870-9641-8ea21279579a/listviewicon.png",
                name: "Icebox",
              },
              {
                icon: "https://media.valorant-api.com/maps/1c18ab1f-420d-0d8b-71d0-77ad3c439115/listviewicon.png",
                name: "Corrode",
              },
              {
                icon: "https://media.valorant-api.com/maps/2bee0dc9-4ffe-519b-1cbd-7fbe763a6047/listviewicon.png",
                name: "Haven",
              },
            ]}
            result={{
              "2765": {
                ascent: {
                  "astra,jett,phoenix,sova,vyse": {
                    lossesCount: 1,
                    mapsCount: 1,
                    patches: [12.1],
                    teams: [
                      {
                        icon: "https://owcdn.net/img/6610f026c1a9e.png",
                        name: "NRG",
                        playedCombCount: 1,
                      },
                    ],
                    winsCount: 0,
                  },
                },
                breeze: {
                  "chamber,neon,sage,sova,viper": {
                    lossesCount: 2,
                    mapsCount: 3,
                    patches: [12.1],
                    teams: [
                      {
                        icon: "https://owcdn.net/img/629f316ddd4dd.png",
                        name: "Global Esports",
                        playedCombCount: 2,
                      },
                      {
                        icon: "https://owcdn.net/img/637b755224c12.png",
                        name: "Team Heretics",
                        playedCombCount: 1,
                      },
                    ],
                    winsCount: 1,
                  },
                  "harbor,jett,kayo,sova,viper": {
                    lossesCount: 1,
                    mapsCount: 2,
                    patches: [12.1],
                    teams: [
                      {
                        icon: "https://owcdn.net/img/6466d79e1ed40.png",
                        name: "Team Vitality",
                        playedCombCount: 1,
                      },
                      {
                        icon: "https://owcdn.net/img/62c82049253b2.png",
                        name: "EDward Gaming",
                        playedCombCount: 1,
                      },
                    ],
                    winsCount: 1,
                  },
                },
              },
            }}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 py-8">
        <div className="flex flex-col gap-0">
          <h3 className="text-center text-2xl">
            Any ideas on how to improve the comb-finder
          </h3>
          <p className="text-muted-foreground text-center text-sm">
            Create an issue on the GitHub repository. Leave suggestions, give
            criticism or simply some feedback
          </p>
        </div>
        <Link
          target="_blank"
          href={"https://github.com/leontm-dev/comb-finder-frontend"}
        >
          <Button variant={"default"}>GitHub</Button>
        </Link>
      </div>
      <Footer />
    </HomepageBackground>
  );
}
