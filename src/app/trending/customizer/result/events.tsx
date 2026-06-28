"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/is-mobile";
import { TrendingEvent } from "@/services/finder/functions";
import Image from "next/image";
import { TrendingMapResult } from "./maps";

type Props = {
  agents: { name: string; icon: string }[];
  maps: { name: string; icon: string }[];
  events: { name: string; icon: string | null; id: string }[];
  eventId: string;
  result: TrendingEvent;
};

export function TrendingEventResult(props: Props) {
  const isMobile = useIsMobile();
  const event = props.events.find((e) => e.id === props.eventId);
  if (!event) return <></>;
  return (
    <AccordionItem value={props.eventId}>
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
        <Accordion>
          {Object.entries(props.result).map((mapEntry) => {
            const map = props.maps.find(
              (m) => m.name.toLowerCase() === mapEntry[0].toLowerCase(),
            );
            if (!map) return <></>;

            return (
              <TrendingMapResult
                withEvents={false}
                eventId={props.eventId}
                key={props.eventId + map.name}
                result={mapEntry[1]}
                map={map}
                maps={props.maps}
                agents={props.agents}
              />
            );
          })}
        </Accordion>
      </AccordionContent>
    </AccordionItem>
  );
}
