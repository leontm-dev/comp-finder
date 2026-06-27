"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/is-mobile";
import { decodeKAYO } from "@/lib/agent";
import { TrendingEvent, TrendingResult } from "@/services/finder/functions";
import cn from "cnfast";
import Image from "next/image";

type Props = {
  result: TrendingResult;
  agents: { name: string; icon: string }[];
  maps: { name: string; icon: string }[];
  events: { id: string; icon: string | null; name: string }[];
};

export function TrendingCombResult(props: Props) {
  const isMobile = useIsMobile();
  return (
    <Accordion>
      {Object.entries(props.result).map((e) => {
        const event = props.events.find((event) => event.id === e[0]);
        if (!event) return <></>;

        return (
          <AccordionItem key={e[0]} value={e[0]}>
            <AccordionTrigger>
              <div className="flex h-6 flex-row items-center gap-1 lg:h-8">
                {event.icon && (
                  <Image
                    src={event.icon}
                    height={isMobile ? 20 : 30}
                    width={isMobile ? 20 : 30}
                    alt=""
                  />
                )}
                <p className="text-muted-foreground text-sm">{event.name}</p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <TrendingEventResult
                result={e[1]}
                agents={props.agents}
                maps={props.maps}
                eventId={e[0]}
              />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
type EventProps = {
  result: TrendingEvent;
  maps: { name: string; icon: string }[];
  agents: { name: string; icon: string }[];
  eventId: string;
};
function TrendingEventResult(props: EventProps) {
  const isMobile = useIsMobile();
  return (
    <Accordion>
      {Object.entries(props.result).map((m) => {
        const map = props.maps.find(
          (map) => map.name.toLowerCase() === m[0].toLowerCase(),
        );
        if (!map) return <></>;

        return (
          <AccordionItem
            value={`${map.name}_${props.eventId}`}
            key={`${map.name}_${props.eventId}`}
          >
            <AccordionTrigger>
              <div className="flex h-6 flex-row items-center gap-2 lg:h-10">
                {!isMobile && (
                  <Image
                    src={map.icon}
                    height={100}
                    width={459}
                    className="h-full w-auto"
                    alt=""
                  />
                )}
                {!isMobile && (
                  <span className="text-xs font-extrabold lg:text-sm">
                    {map.name.charAt(0).toUpperCase()}
                    {map.name.slice(1)}
                  </span>
                )}
                {isMobile && (
                  <div className="relative flex h-6 items-center justify-center">
                    <Image
                      src={map.icon}
                      height={50}
                      width={230}
                      className="h-full w-auto"
                      alt=""
                    />
                    <div className="bg-background/50 absolute flex h-full w-full items-center justify-center">
                      <span className="text-xs font-extrabold lg:text-sm">
                        {map.name.charAt(0).toUpperCase()}
                        {map.name.slice(1)}
                      </span>
                    </div>
                  </div>
                )}
                <Badge variant={"outline"} className="hover:no-underline">
                  {!isMobile && <>Played: </>}
                  {Object.entries(m[1])
                    .map((v) => v[1])
                    .map((t) => t.mapsCount)
                    .reduce((a, b) => a + b)}
                </Badge>
                <Badge variant={"default"} className="hover:no-underline">
                  {!isMobile && <>Wins: </>}
                  {Object.entries(m[1])
                    .map((v) => v[1])
                    .map((t) => t.winsCount)
                    .reduce((a, b) => a + b)}
                </Badge>
                <Badge variant={"destructive"} className="hover:no-underline">
                  {!isMobile && <>Losses: </>}
                  {Object.entries(m[1])
                    .map((v) => v[1])
                    .map((t) => t.lossesCount)
                    .reduce((a, b) => a + b)}
                </Badge>
                <Badge variant={"secondary"} className="hover:no-underline">
                  Teams:{" "}
                  {Object.entries(m[1])
                    .map((v) => v[1])
                    .map((t) => t.teams.length)
                    .reduce((a, b) => a + b)}
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {Object.entries(m[1])
                .sort((a, b) => b[1].mapsCount - a[1].mapsCount)
                .map((comp) => (
                  <Card
                    key={`${props.eventId}_${map.name}_${comp}`}
                    className="bg-background flex flex-row flex-wrap items-center justify-between gap-4"
                  >
                    <div className="flex flex-row items-center gap-4">
                      <div className="flex flex-row flex-nowrap items-center gap-2">
                        {comp[0]
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
                                    (a) =>
                                      a.name.toLowerCase() ===
                                      agent.toLowerCase(),
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
                        <div className="flex flex-col gap-1">
                          <p className="text-muted-foreground text-xs italic">
                            Teams playing this:
                          </p>
                          <div className="flex flex-row items-center gap-1">
                            {comp[1].teams
                              .sort(
                                (a, b) => b.playedCombCount - a.playedCombCount,
                              )
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
                                    {team.name} played this{" "}
                                    {team.playedCombCount} time(s)
                                  </TooltipContent>
                                </Tooltip>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <Badge>{comp[1].winsCount} wins</Badge>
                      <Badge variant={"destructive"}>
                        {comp[1].lossesCount} losses
                      </Badge>
                      <Badge variant={"secondary"}>
                        {comp[1].mapsCount} maps
                      </Badge>
                    </div>
                  </Card>
                ))}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
