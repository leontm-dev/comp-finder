export type CompResult = {
  agents: string[];
  map: string;
  team: {
    iconUrl: string;
    name: string;
  };
  vod: string | null;
  event: {
    iconUrl: string | null;
    title: string | null;
  };
  patch: number | null;
  url: string;
  won: boolean;
};
