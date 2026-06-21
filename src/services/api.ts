import { APIEventsCollection } from "./events";
import { APIFinderCollection } from "./finder";

export const API = {
  Finder: APIFinderCollection,
  Events: APIEventsCollection,
} as const;
