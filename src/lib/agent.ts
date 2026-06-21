export function encodeKAYO(input: string) {
  if (input.toLowerCase() === "kay/o") return "kayo";

  return input;
}
export function decodeKAYO(input: string) {
  if (input.toLowerCase() === "kayo") return "kay/o";

  return input;
}
