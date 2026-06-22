export type VlrMap = {
  readonly _id: { toString: () => string };
  readonly createdAt: Date;
  readonly updatedAt: Date;
  vlrId: string;
  /**
   * TeamName_MatchId_MapName_
   */
  customId: string;
  name: string;
  agents: string[];
  team: string;
  teamLogoUrl: string;
  won: boolean;
  vodUrl: string | null;
  patch: number | null;
  eventId: string;
};

export type VlrMapWithEvent = VlrMap & {
  eventTitle: string | null;
  eventIcon: string | null;
};
