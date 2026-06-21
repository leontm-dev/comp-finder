"use server";

import { callApiRoute } from "@/lib/api";
import { VlrEvent } from "@/types/event.type";

export async function getEvents() {
  return await callApiRoute<VlrEvent[]>("/events", undefined, {
    method: "GET",
  });
}
