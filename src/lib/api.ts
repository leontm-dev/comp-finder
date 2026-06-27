import { ApiResponse } from "@/types/response.type";

export async function callApiRoute<T, C extends string = string>(
  route: string,
  query?: Record<C, string | undefined>,
  config: RequestInit & { method?: "GET" | "POST" } = { method: "GET" },
): Promise<ApiResponse<T>> {
  const queryEntries = Object.entries(query || {});
  const queryString = `${queryEntries.length > 0 ? "?" : ""}${queryEntries
    .filter((v) => !!v[1])
    .map((v) => v[0] + "=" + v[1])
    .join("&")}`;

  const url =
    process.env.NODE_ENV === "production"
      ? "https://api.comp-finder.leontm.me"
      : "http://localhost:9090";
  const response = await fetch(
    url + (route.startsWith("/") ? route : "/" + route) + queryString,
    config,
  )
    .then((res) => res)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return {
        ok: false,
        status: 501,
        message: "Connection to server lost. Retry later",
        data: null,
        at: new Date(),
      } as ApiResponse;
    });

  return response as ApiResponse<T>;
}
