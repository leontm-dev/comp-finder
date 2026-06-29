"use server";

import { encodeKAYO } from "@/lib/agent";
import { callApiRoute } from "@/lib/api";
import { CompResult } from "@/types/result.type";
export type TrendingResult = Record<string, TrendingEvent>;
export type TrendingEvent = Record<string, TrendingMap>;
export type TrendingMap = Record<string, TrendingComp>;
export type TrendingComp = {
  teams: {
    name: string;
    icon: string;
    playedCombCount: number;
  }[];
  patches: number[];
  winsCount: number;
  lossesCount: number;
  mapsCount: number;
};
export type TrendingCompWithEventIds = TrendingComp & { eventIds: string[] };

export async function findComb(
  agents: string[],
  map: string,
  eventIds?: string[],
  winningState?: "won" | "lost",
  needsToHaveVod?: boolean,
  patch?: number,
  patchBehavior?: "above" | "on" | "below",
) {
  return await callApiRoute<
    CompResult[],
    | "eventIds"
    | "agents"
    | "map"
    | "winningState"
    | "needsToHaveVod"
    | "patch"
    | "patchBehavior"
  >("/finder", {
    eventIds: eventIds ? eventIds.join(",") : undefined,
    agents: agents
      .map((agent) => encodeURIComponent(encodeKAYO(agent.trim())))
      .join(","),
    map: map,
    winningState,
    needsToHaveVod:
      needsToHaveVod === undefined
        ? undefined
        : needsToHaveVod
          ? "true"
          : "false",
    patch: patch ? patch.toString() : undefined,
    patchBehavior,
  });
}

export async function getTrending(patch: number, patchRange: number = 2) {
  return await callApiRoute<{
    events: { name: string; icon: string | null; id: string }[];
    result: TrendingResult;
  }>(
    "/finder/trending",
    {
      patchRange: patchRange ? patchRange.toString() : undefined,
      patch: patch.toString(),
    },
    { method: "GET" },
  );
}
