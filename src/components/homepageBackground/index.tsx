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
      const selected = maps[Math.round(Math.random() * maps.length) - 1];
      setSelectedMap({ light: selected.light, dark: selected.dark });
    }
    load();
  }, []);
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    async function load() {
      const img = document.querySelector(
        "img#map-background",
      ) as HTMLImageElement | null;
      if (!img) return;
      const { dominant } = await getDominantColorAsync(img, {
        colorFormat: "hex",
        colorQuantization: "median-cut",
      });

      setBackgroundColor(dominant);
    }

    load();
  }, [selectedMap, resolvedTheme]);

  return (
    <div
      className={cn(
        "relative flex min-h-screen max-w-screen flex-col",
        !backgroundColor && "bg-background",
      )}
    >
      <main className="flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        <Navbar
          textClassName={"text-white"}
          buttonVariant={resolvedTheme === "light" ? "default" : "outline"}
          className="absolute top-0 z-20"
        />
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
      <div
        className={cn(
          "bg-background relative flex h-50 max-w-screen flex-col gap-4",
        )}
        style={
          backgroundColor
            ? {
                background: `linear-gradient(180deg, 
          ${backgroundColor} 0%,
          color-mix(in srgb, ${backgroundColor} 70%, var(--background)) 30%,
          color-mix(in srgb, ${backgroundColor} 30%, var(--background)) 60%,
          color-mix(in srgb, ${backgroundColor} 10%, var(--background)) 80%,
          var(--background) 100%)`,
              }
            : undefined
        }
      ></div>
      {props.children}
    </div>
  );
}
