"use server";

import { encodeKAYO } from "@/lib/agent";
import { callApiRoute } from "@/lib/api";
import { CombResult } from "@/types/result.type";

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
    CombResult[],
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
