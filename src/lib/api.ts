export async function callApiRoute<T, C extends string = string>(
  route: string,
  query?: Record<C, string | undefined>,
  config: RequestInit & { method?: "GET" | "POST" } = { method: "GET" },
): Promise<T> {
  const queryEntries = Object.entries(query || {});
  const queryString = `${queryEntries.length > 0 ? "?" : ""}${queryEntries
    .filter((v) => !!v[1])
    .map((v) => v[0] + "=" + v[1])
    .join("&")}`;

  const response = fetch(
    "http://localhost:9090" +
      (route.startsWith("/") ? route : "/" + route) +
      queryString,
    config,
  )
    .then((res) => {
      if (!res.ok) return null;

      return res.json();
    })
    .catch((err) => {
      throw new Error(err);
    });

  if (!response) throw new Error("Response failed");

  return response as T;
}
