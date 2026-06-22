"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useIsMobile } from "@/hooks/is-mobile";
import { decodeKAYO } from "@/lib/agent";
import { cn } from "cnfast";
import { CombResult } from "@/types/result.type";
import { ClockArrowUp, MonitorPlay } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  result: CombResult;
  selectedAgents: string[];
  agents: { name: string; icon: string }[];
};

export function FinderResult(props: Props) {
  const isMobile = useIsMobile();
  return (
    <HoverCard>
      <HoverCardContent
        className={"w-full"}
        side={isMobile ? "bottom" : "left"}
      >
        <div className="flex flex-col gap-2">
          <div className="flex h-5 flex-row items-center gap-1">
            <div className="flex flex-row items-center gap-2">
              {props.result.team.iconUrl && (
                <Image
                  src={props.result.team.iconUrl}
                  height={20}
                  width={20}
                  alt=""
                />
              )}
              <p className="text-xs text-nowrap">{props.result.team.name}</p>
            </div>
            <span className="text-muted-foreground text-xs italic">on</span>
            <p className="text-xs">
              {props.result.map.charAt(0).toUpperCase()}
              {props.result.map.slice(1)}
            </p>
          </div>
          <div className="flex flex-row flex-wrap items-center gap-1">
            <Badge variant={props.result.won ? "default" : "outline"}>
              {props.result.won ? "Win" : "Lose"}
            </Badge>
            {props.result.patch && (
              <Badge variant={"outline"}>
                <ClockArrowUp />
                {props.result.patch.toFixed(2)}
              </Badge>
            )}
            {props.result.vod && (
              <Badge variant={"secondary"}>
                <MonitorPlay /> Vod
              </Badge>
            )}
          </div>
        </div>
      </HoverCardContent>
      <HoverCardTrigger
        render={
          <Link target="_blank" href={new URL(props.result.url)}>
            <Card className="w-full">
              <div className="flex flex-row items-center gap-2">
                {props.result.team.iconUrl && (
                  <div className="bg-muted flex aspect-square size-20 h-full shrink-0 flex-col gap-2">
                    <Image
                      src={props.result.team.iconUrl}
                      width={100}
                      height={100}
                      alt=""
                      className="p-2"
                    />
                  </div>
                )}
                <div className="flex h-full w-full flex-col justify-center gap-1">
                  <div className="flex flex-row flex-nowrap items-center gap-4">
                    <div className="flex h-5 flex-row items-center gap-1">
                      {props.result.event.iconUrl && (
                        <Image
                          src={props.result.event.iconUrl}
                          height={20}
                          width={20}
                          alt=""
                        />
                      )}
                      <p className="text-muted-foreground text-xs text-nowrap">
                        {props.result.event.title}
                      </p>
                    </div>
                  </div>
                  <div className="flex h-15 shrink-0 flex-row items-center gap-2">
                    {props.result.agents
                      .sort()
                      .map((agent) => decodeKAYO(agent.toLowerCase()))
                      .map((agent) => (
                        <div
                          key={agent}
                          className={cn(
                            "flex aspect-square h-full items-center justify-center",
                            props.selectedAgents.includes(
                              agent.toLowerCase(),
                            ) && "bg-primary",
                            !props.selectedAgents.includes(
                              agent.toLowerCase(),
                            ) && "bg-muted",
                          )}
                        >
                          <Image
                            src={
                              props.agents.find(
                                (a) =>
                                  a.name.toLowerCase() === agent.toLowerCase(),
                              )?.icon ?? ""
                            }
                            width={100}
                            height={100}
                            alt=""
                            className="p-1"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        }
      ></HoverCardTrigger>
    </HoverCard>
  );
}
