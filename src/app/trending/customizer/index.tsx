"use client";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { API } from "@/services/api";
import { TrendingResult } from "@/services/finder/functions";
import { Maps } from "@/types/maps.enum";
import { ClockArrowUp, Search } from "lucide-react";
import { useQueryState } from "nuqs";
import React from "react";
import { toast } from "sonner";
import { TrendingCombResult } from "./result";

export function TrendingCustomizerForm() {
  const [result, setResult] = React.useState<TrendingResult | null>(null);
  const [events, setEvents] = React.useState<
    { name: string; icon: string | null; id: string }[]
  >([]);
  const [agents, setAgents] = React.useState<{ name: string; icon: string }[]>(
    [],
  );
  const [maps, setMaps] = React.useState<{ name: string; icon: string }[]>([]);
  const [currentPatch, setCurrentPatch] = React.useState<number | null>(null);
  const [assetsLoading, setAssetsLoading] = React.useState<boolean>(true);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [patch, setPatch] = useQueryState<number | null>("patch", {
    defaultValue: null,
    parse: (value) => (isNaN(parseFloat(value)) ? null : parseFloat(value)),
  });
  const [patchRange, setPatchRange] = useQueryState<number | null>(
    "patchRange",
    {
      defaultValue: 0,
      parse: (value) => (isNaN(parseFloat(value)) ? null : parseFloat(value)),
    },
  );

  const [message, setMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadData() {
      setAssetsLoading(true);
      setAgents(
        (
          await fetch("https://valorant-api.com/v1/agents", {
            method: "GET",
          })
            .then((res) => res.json())
            .then((res) => res.data)
        )
          .filter(
            (e: { isPlayableCharacter: boolean }) => e.isPlayableCharacter,
          )
          .map((e: { displayName: string; displayIcon: string }) => ({
            name: e.displayName,
            icon: e.displayIcon,
          })),
      );
      setMaps(
        (
          await fetch("https://valorant-api.com/v1/maps", {
            method: "GET",
          })
            .then((res) => res.json())
            .then((res) => {
              return res.data;
            })
        )
          .filter((e: { displayName: string }) => {
            return Object.keys(Maps)
              .map((f) => f.toLowerCase())
              .includes(e.displayName.toLowerCase());
          })
          .map((e: { displayName: string; listViewIcon: string }) => ({
            name: e.displayName,
            icon: e.listViewIcon,
          })),
      );
      setCurrentPatch(
        parseFloat(
          String(
            (
              await fetch("https://valorant-api.com/v1/version", {
                method: "GET",
              })
                .then((res) => res.json())
                .then((res) => res.data)
            ).riotClientVersion,
          ).split("-")[1],
        ),
      );
      setAssetsLoading(false);
    }

    loadData();
  }, []);

  React.useEffect(() => {
    if (!message) return;

    toast.error(message);
  }, [message]);

  return (
    <div className="relative flex h-full flex-col gap-4 border p-2 lg:p-4">
      <div className="flex w-full flex-col gap-2">
        <div className="flex flex-col gap-0">
          <h2 className="decoration-primary text-2xl underline">
            Discover the most trending comb
          </h2>
          <p className="text-muted-foreground text-sm">
            Use filters to customize your results. Filter values are saved in
            the url so feel free go back anytime you want.
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-4 lg:flex-row">
          <div className="flex w-full flex-col gap-2">
            <p className="text-sm">Patch</p>
            <InputGroup>
              <InputGroupAddon align={"inline-start"}>
                <ClockArrowUp />
              </InputGroupAddon>
              <InputGroupInput
                step={0.01}
                type="number"
                min={1}
                value={patch}
                onChange={(ev) => {
                  const modValue = parseFloat(ev.target.value);
                  if (isNaN(modValue)) return setPatch(null);

                  return setPatch(modValue);
                }}
              />
              <InputGroupAddon align={"inline-end"}>
                <InputGroupButton
                  disabled={!currentPatch}
                  onClick={() => setPatch(currentPatch)}
                >
                  Use current
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <p className="text-muted-foreground text-xs">
              Set a patch around which you wanna search for trending tier 1
              combs
            </p>
          </div>
          <div className="flex w-full flex-col gap-2">
            <p className="text-sm">Patch-range</p>
            <div className="flex flex-row items-center gap-1">
              <Slider
                value={patchRange}
                onValueChange={(value) => {
                  if (Array.isArray(value)) {
                    setPatchRange(value[0]);
                  } else if (typeof value === "number") {
                    setPatchRange(value);
                  }
                }}
                step={0.01}
                max={1}
                min={0}
              />
              {patchRange && (
                <p className="text-sm">{patchRange.toFixed(2).toString()}</p>
              )}
            </div>
            <p className="text-muted-foreground text-xs">
              Declare a patch range that gives you a little more results (in
              case there were no events played on your patch)
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {message && <p className="text-md text-destructive">{message}</p>}
          <Button
            className={"w-min"}
            disabled={message !== null || loading || assetsLoading}
            onClick={() => {
              if (!patch)
                return setMessage(
                  "Please set a patch you wanna search around.",
                );
              if (!patchRange)
                return setMessage(
                  "Please declare a search range so that you don't get too many but also not too few results",
                );
              setLoading(true);
              API.Finder.getTrending(patch, patchRange).then((res) => {
                setLoading(false);
                if (!res || !res.ok || !res.data)
                  return setMessage(res.message);

                toast.success(`Trending combs found`, {
                  description: `patch: ${patch} • range: ${patchRange}`,
                });

                if (Object.entries(res.data.result).length === 0) {
                  setResult(null);
                } else {
                  setResult(res.data.result);
                }
                setEvents(res.data.events);
              });
            }}
          >
            {loading ? (
              "Discovering..."
            ) : (
              <>
                <Search />
                Discover
              </>
            )}
          </Button>
        </div>
      </div>
      <Separator />
      {!result && (
        <div className="bg-muted flex h-full w-full flex-1 items-center justify-center py-8">
          <p className="text-sm">No results found</p>
        </div>
      )}
      {result && (
        <div className={"no-scrollbar grow-0 overflow-y-auto"}>
          <TrendingCombResult
            result={result}
            agents={agents}
            maps={maps}
            events={events}
          />
        </div>
      )}
    </div>
  );
}
