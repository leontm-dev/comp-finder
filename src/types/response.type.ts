export type ApiResponse<T = unknown> = {
  ok: boolean;
  status: number;
  message: string;
  at: Date;
  data: T;
};
