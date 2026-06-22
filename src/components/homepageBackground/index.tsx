"use client";

import { Navbar } from "@/components/base-layout/navbar";
import { Maps } from "@/types/maps.enum";
import { useTheme } from "next-themes";
import React from "react";
import { getDominantColorAsync } from "@rtcoder/dominant-color";
import cn from "cnfast";

// Code

type Props = {
  contents: React.ReactNode;
  children: React.ReactNode[];
};
export function HomepageBackground(props: Props) {
  const [backgroundColor, setBackgroundColor] = React.useState<string | null>(
    null,
  );
  const [selectedMap, setSelectedMap] = React.useState<{
    dark: string;
    light: string;
  } | null>(null);

  React.useEffect(() => {
    async function load() {
      const maps = (
        await fetch("https://valorant-api.com/v1/maps", {
          method: "GET",
        })
          .then((res) => res.json())
          .then((res) => {
            return res.data as {
              displayName: string;
              stylizedBackgroundImage: string;
              premierBackgroundImage: string;
            }[];
          })
      )
        .filter((e: { displayName: string }) => {
          return Object.keys(Maps)
            .map((f) => f.toLowerCase())
            .includes(e.displayName.toLowerCase());
        })
        .map(
          (e: {
            displayName: string;
            stylizedBackgroundImage: string;
            premierBackgroundImage: string;
          }) => ({
            name: e.displayName,
            dark: e.stylizedBackgroundImage,
            light: e.premierBackgroundImage,
          }),
        );
      console.log(maps);
      const selected = maps[Math.round(Math.random() * maps.length) - 1];
      setSelectedMap({ light: selected.light, dark: selected.dark });
    }
    load();
  }, []);
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    async function load() {
      const img = document.querySelector("img") as HTMLImageElement | null;
      console.log(img);
      if (!img) return;
      const { dominant } = await getDominantColorAsync(img, {
        colorFormat: "hex",
        colorQuantization: "median-cut",
      });

      console.log(dominant);
      setBackgroundColor(dominant);
    }

    load();
  }, [selectedMap, resolvedTheme]);

  return (
    <div
      className={cn(
        "relative flex min-h-screen max-w-screen flex-col gap-4",
        !backgroundColor && "bg-background",
      )}
      style={
        backgroundColor
          ? {
              backgroundColor: backgroundColor,
            }
          : undefined
      }
    >
      <main className="flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        <Navbar buttonVariant={"outline"} className="absolute top-0 z-20" />
        {selectedMap && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            id="map-background"
            className="h-full w-full object-cover"
            src={
              resolvedTheme === "dark" ? selectedMap.dark : selectedMap.light
            }
            alt=""
          />
        )}
        <div className="absolute top-0 left-0 flex h-screen w-full flex-col items-center justify-center">
          {props.contents}
        </div>
      </main>
      {props.children}
    </div>
  );
}
