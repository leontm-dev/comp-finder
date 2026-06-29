"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/is-mobile";
import { decodeKAYO } from "@/lib/agent";
import {
  TrendingComp,
  TrendingCompWithEventIds,
} from "@/services/finder/functions";
import cn from "cnfast";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  agents: { name: string; icon: string }[];
  maps: { name: string; icon: string }[];
  combIdentifier: string;
  mapIdentifier: string;
};

type PropsWithEvents = Props & {
  events: { name: string; icon: string | null; id: string }[];
  result: TrendingCompWithEventIds;
};
type PropsWithoutEvents = Props & { eventId: string; result: TrendingComp };

export function TrendingCompResultWithEvents(props: PropsWithEvents) {
  const isMobile = useIsMobile();
  return (
    <HoverCard>
      <HoverCardContent>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground text-xs italic">Events</p>
            <div className="flex flex-row flex-wrap items-center gap-1">
              {props.result.eventIds.map((e) => {
                const event = props.events.find((ev) => ev.id === e);
                if (!event) return <></>;

                return (
                  <Badge key={e} variant={"secondary"}>
                    {event.icon && (
                      <Image src={event.icon} alt="" width={10} height={10} />
                    )}
                    {event.name}
                  </Badge>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground text-xs italic">
              Played on patches:
            </p>
            <div className="flex flex-row flex-wrap items-center gap-1">
              {props.result.patches
                .sort((a, b) => a - b)
                .map((patch) => (
                  <Badge variant={"outline"} key={patch}>
                    {patch.toFixed(2)}
                  </Badge>
                ))}
            </div>
          </div>
          <Link
            target="_blank"
            href={`/find?map=${props.mapIdentifier.toLowerCase()}&agents=${props.combIdentifier}`}
          >
            <Button>
              <ExternalLink /> Open on finder
            </Button>
          </Link>
        </div>
      </HoverCardContent>
      <HoverCardTrigger
        render={
          <Card className="bg-background flex flex-row flex-wrap items-center justify-between gap-4">
            <div className="flex flex-row items-center gap-4">
              <div className="flex flex-row flex-nowrap items-center gap-2">
                {props.combIdentifier
                  .split(",")
                  .sort()
                  .map((agent) => decodeKAYO(agent.toLowerCase()))
                  .map((agent) => (
                    <div
                      key={agent}
                      className={cn(
                        "bg-muted flex aspect-square h-full items-center justify-center p-0 lg:p-2",
                      )}
                    >
                      <Image
                        src={
                          props.agents.find(
                            (a) => a.name.toLowerCase() === agent.toLowerCase(),
                          )?.icon ?? ""
                        }
                        width={isMobile ? 30 : 60}
                        height={isMobile ? 30 : 60}
                        alt=""
                        className="p-1"
                      />
                    </div>
                  ))}
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-col gap-0">
                  <p className="text-muted-foreground text-xs italic">
                    Teams playing this:
                  </p>
                  <div className="flex flex-row items-center gap-1">
                    {props.result.teams
                      .sort((a, b) => b.playedCombCount - a.playedCombCount)
                      .map((team) => (
                        <Tooltip key={team.name}>
                          <TooltipTrigger
                            render={
                              <div className="bg-muted flex aspect-square items-center justify-center">
                                <Image
                                  height={isMobile ? 30 : 50}
                                  width={isMobile ? 30 : 50}
                                  className="p-1"
                                  src={team.icon}
                                  alt=""
                                />
                              </div>
                            }
                          />
                          <TooltipContent>
                            {team.name} played this {team.playedCombCount}{" "}
                            time(s)
                          </TooltipContent>
                        </Tooltip>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center gap-1">
              <Badge>{props.result.winsCount} wins</Badge>
              <Badge variant={"destructive"}>
                {props.result.lossesCount} losses
              </Badge>
              <Badge variant={"secondary"}>{props.result.mapsCount} maps</Badge>
            </div>
          </Card>
        }
      />
    </HoverCard>
  );
}
export function TrendingCompResultWithoutEvents(props: PropsWithoutEvents) {
  const isMobile = useIsMobile();
  return (
    <HoverCard>
      <HoverCardContent>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-0">
            <p className="text-muted-foreground text-xs italic">
              Played on patches:
            </p>
            <div className="flex flex-row flex-wrap items-center gap-1">
              {props.result.patches
                .sort((a, b) => a - b)
                .map((patch) => (
                  <Badge variant={"outline"} key={patch}>
                    {patch.toFixed(2)}
                  </Badge>
                ))}
            </div>
          </div>
        </div>
      </HoverCardContent>
      <HoverCardTrigger
        render={
          <Card className="bg-background flex flex-row flex-wrap items-center justify-between gap-4">
            <div className="flex flex-row items-center gap-4">
              <div className="flex flex-row flex-nowrap items-center gap-2">
                {props.combIdentifier
                  .split(",")
                  .sort()
                  .map((agent) => decodeKAYO(agent.toLowerCase()))
                  .map((agent) => (
                    <div
                      key={agent}
                      className={cn(
                        "bg-muted flex aspect-square h-full items-center justify-center p-0 lg:p-2",
                      )}
                    >
                      <Image
                        src={
                          props.agents.find(
                            (a) => a.name.toLowerCase() === agent.toLowerCase(),
                          )?.icon ?? ""
                        }
                        width={isMobile ? 30 : 60}
                        height={isMobile ? 30 : 60}
                        alt=""
                        className="p-1"
                      />
                    </div>
                  ))}
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-col gap-0">
                  <p className="text-muted-foreground text-xs italic">
                    Teams playing this:
                  </p>
                  <div className="flex flex-row items-center gap-1">
                    {props.result.teams
                      .sort((a, b) => b.playedCombCount - a.playedCombCount)
                      .map((team) => (
                        <Tooltip key={team.name}>
                          <TooltipTrigger
                            render={
                              <div className="bg-muted flex aspect-square items-center justify-center">
                                <Image
                                  height={isMobile ? 30 : 50}
                                  width={isMobile ? 30 : 50}
                                  className="p-1"
                                  src={team.icon}
                                  alt=""
                                />
                              </div>
                            }
                          />
                          <TooltipContent>
                            {team.name} played this {team.playedCombCount}{" "}
                            time(s)
                          </TooltipContent>
                        </Tooltip>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center gap-1">
              <Badge>{props.result.winsCount} wins</Badge>
              <Badge variant={"destructive"}>
                {props.result.lossesCount} losses
              </Badge>
              <Badge variant={"secondary"}>{props.result.mapsCount} maps</Badge>
            </div>
          </Card>
        }
      />
    </HoverCard>
  );
}
