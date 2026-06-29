"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/is-mobile";
import {
  TrendingCompWithEventIds,
  TrendingMap,
} from "@/services/finder/functions";
import Image from "next/image";
import {
  TrendingCompResultWithEvents,
  TrendingCompResultWithoutEvents,
} from "./comp";

type Props = {
  map: {
    name: string;
    icon: string;
  };
  agents: { name: string; icon: string }[];
  maps: { name: string; icon: string }[];
} & (PropsWithEvents | PropsWithoutEvents);

type PropsWithEvents = {
  events: { name: string; icon: string | null; id: string }[];
  result: Record<string, TrendingCompWithEventIds>;
  withEvents: true;
};
type PropsWithoutEvents = {
  eventId: string;
  result: TrendingMap;
  withEvents: false;
};
export function TrendingMapResult(props: Props) {
  const isMobile = useIsMobile();

  return (
    <AccordionItem
      value={`${props.map.name}_${props.withEvents ? "" : props.eventId}`}
    >
      <AccordionTrigger>
        <div className="flex h-6 flex-row items-center gap-2 lg:h-10">
          {!isMobile && (
            <Image
              src={props.map.icon}
              height={100}
              width={459}
              className="h-full w-auto"
              alt=""
            />
          )}
          {!isMobile && (
            <span className="text-xs font-extrabold lg:text-sm">
              {props.map.name.charAt(0).toUpperCase()}
              {props.map.name.slice(1)}
            </span>
          )}
          {isMobile && (
            <div className="relative flex h-6 items-center justify-center">
              <Image
                src={props.map.icon}
                height={50}
                width={230}
                className="h-full w-auto"
                alt=""
              />
              <div className="bg-background/50 absolute flex h-full w-full items-center justify-center">
                <span className="text-xs font-extrabold lg:text-sm">
                  {props.map.name.charAt(0).toUpperCase()}
                  {props.map.name.slice(1)}
                </span>
              </div>
            </div>
          )}
          <Badge variant={"outline"} className="hover:no-underline">
            {!isMobile && <>Played: </>}
            {Object.entries(props.result)
              .map((v) => v[1])
              .map((t) => t.mapsCount)
              .reduce((a, b) => a + b)}
          </Badge>
          <Badge variant={"default"} className="hover:no-underline">
            {!isMobile && <>Wins: </>}
            {Object.entries(props.result)
              .map((v) => v[1])
              .map((t) => t.winsCount)
              .reduce((a, b) => a + b)}
          </Badge>
          <Badge variant={"destructive"} className="hover:no-underline">
            {!isMobile && <>Losses: </>}
            {Object.entries(props.result)
              .map((v) => v[1])
              .map((t) => t.lossesCount)
              .reduce((a, b) => a + b)}
          </Badge>
          <Badge variant={"secondary"} className="hover:no-underline">
            Teams:{" "}
            {Object.entries(props.result)
              .map((v) => v[1])
              .map((t) => t.teams.length)
              .reduce((a, b) => a + b)}
          </Badge>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {Object.entries(props.result)
          .sort((a, b) => b[1].mapsCount - a[1].mapsCount)
          .map((comp) =>
            props.withEvents ? (
              <TrendingCompResultWithEvents
                result={comp[1] as unknown as TrendingCompWithEventIds}
                maps={props.maps}
                agents={props.agents}
                events={props.events}
                combIdentifier={comp[0]}
                key={comp[0] + props.map.name}
                mapIdentifier={props.map.name}
              />
            ) : (
              <TrendingCompResultWithoutEvents
                result={comp[1]}
                maps={props.maps}
                agents={props.agents}
                combIdentifier={comp[0]}
                eventId={props.eventId}
                key={props.eventId + comp[0] + props.map.name}
                mapIdentifier={props.map.name}
              />
            ),
          )}
      </AccordionContent>
    </AccordionItem>
  );
}
