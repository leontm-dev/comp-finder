import { getEvents } from "./functions";

export const APIEventsCollection = {
  get: getEvents,
} as const;
