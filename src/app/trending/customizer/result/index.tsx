import { Accordion } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingComp,
  TrendingCompWithEventIds,
  type TrendingResult,
} from "@/services/finder/functions";
import { TrendingMapResult } from "./maps";
import { TrendingEventResult } from "./events";

type Props = {
  result: TrendingResult;
  allowMapDisplayMethod: boolean;
  events: { name: string; icon: string | null; id: string }[];
  agents: { name: string; icon: string }[];
  maps: { name: string; icon: string }[];
};

export function TrendingResult(props: Props) {
  if (props.allowMapDisplayMethod) {
    const result: Record<string, Record<string, TrendingCompWithEventIds>> = {};
    if (Object.values(props.result).length !== 0) {
      Object.entries(props.result).map((eventEntry) => {
        const eventId = eventEntry[0];

        Object.entries(eventEntry[1]).map((mapEntry) => {
          const mapName = mapEntry[0];

          Object.entries(mapEntry[1]).map((compEntry) => {
            const compIdentifier = compEntry[0];
            if (!compIdentifier) return;

            const entry: TrendingCompWithEventIds = result[mapName]?.[
              compIdentifier
            ] || {
              eventIds: [],
              lossesCount: 0,
              winsCount: 0,
              mapsCount: 0,
              patches: [],
              teams: [],
            };

            if (!result[mapName]) {
              result[mapName] = {};
            }

            result[mapName][compIdentifier] = {
              eventIds: [...entry.eventIds, eventId],
              patches: Array.from(
                new Set([...entry.patches, ...compEntry[1].patches]),
              ),
              lossesCount: entry.lossesCount + compEntry[1].lossesCount,
              winsCount: entry.winsCount + compEntry[1].winsCount,
              mapsCount: entry.mapsCount + compEntry[1].mapsCount,
              teams: [...entry.teams, ...compEntry[1].teams],
            };
          });
        });
      });
    }

    return (
      <Tabs>
        <TabsList className={"w-full"}>
          <TabsTrigger value={"events"}>Events</TabsTrigger>
          <TabsTrigger value={"maps"}>Maps</TabsTrigger>
          <TabsTrigger value={"teams"}>Teams</TabsTrigger>
        </TabsList>
        <TabsContent value={"events"}>
          <Accordion>
            {Object.entries(props.result).map((eventEntry) => (
              <TrendingEventResult
                eventId={eventEntry[0]}
                maps={props.maps}
                agents={props.agents}
                events={props.events}
                key={eventEntry[0]}
                result={eventEntry[1]}
              />
            ))}
          </Accordion>
        </TabsContent>
        <TabsContent value={"maps"}>
          <Accordion>
            {Object.entries(result).map((mapEntry) => {
              const map = props.maps.find(
                (m) => m.name.toLowerCase() === mapEntry[0].toLowerCase(),
              );
              if (!map) return <></>;

              return (
                <TrendingMapResult
                  withEvents
                  events={props.events}
                  map={map}
                  result={mapEntry[1]}
                  agents={props.agents}
                  maps={props.maps}
                  key={mapEntry[0]}
                />
              );
            })}
          </Accordion>
        </TabsContent>
        <TabsContent value={"teams"}>
          <div className="bg-muted flex h-20 w-full flex-col items-center justify-center">
            <p className="text-sm italic">Coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>
    );
  }

  return (
    <Accordion>
      {Object.entries(props.result).map((eventEntry) => (
        <TrendingEventResult
          eventId={eventEntry[0]}
          maps={props.maps}
          agents={props.agents}
          events={props.events}
          key={eventEntry[0]}
          result={eventEntry[1]}
        />
      ))}
    </Accordion>
  );
}
