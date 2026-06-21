export type VlrEvent = {
  readonly _id: {
    toString: () => string;
  };
  readonly createdAt: Date;
  readonly updatedAt: Date;
  vlrId: string;
  title: string;
  region: string;
  dates: string;
  patch: string | null;
  icon: string | null;
};
