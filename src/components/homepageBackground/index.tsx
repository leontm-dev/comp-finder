"use client";

import { Navbar } from "@/components/base-layout/navbar";
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
      const maps = [
        {
          dark: "https://media.valorant-api.com/maps/7eaecc1b-4337-bbf6-6ab9-04b8f06b3319/stylizedbackgroundimage.png",
          light:
            "https://media.valorant-api.com/maps/7eaecc1b-4337-bbf6-6ab9-04b8f06b3319/premierbackgroundimage.png",
          name: "Ascent",
        },
        {
          dark: "https://media.valorant-api.com/maps/d960549e-485c-e861-8d71-aa9d1aed12a2/stylizedbackgroundimage.png",
          light:
            "https://media.valorant-api.com/maps/d960549e-485c-e861-8d71-aa9d1aed12a2/premierbackgroundimage.png",
          name: "Split",
        },
        {
          dark: "https://media.valorant-api.com/maps/b529448b-4d60-346e-e89e-00a4c527a405/stylizedbackgroundimage.png",
          light:
            "https://media.valorant-api.com/maps/b529448b-4d60-346e-e89e-00a4c527a405/premierbackgroundimage.png",
          name: "Fracture",
        },
        {
          dark: "https://media.valorant-api.com/maps/2c9d57ec-4431-9c5e-2939-8f9ef6dd5cba/stylizedbackgroundimage.png",
          light:
            "https://media.valorant-api.com/maps/2c9d57ec-4431-9c5e-2939-8f9ef6dd5cba/premierbackgroundimage.png",
          name: "Bind",
        },
        {
          dark: "https://media.valorant-api.com/maps/2fb9a4fd-47b8-4e7d-a969-74b4046ebd53/stylizedbackgroundimage.png",
          light:
            "https://media.valorant-api.com/maps/2fb9a4fd-47b8-4e7d-a969-74b4046ebd53/premierbackgroundimage.png",
          name: "Breeze",
        },
        {
          dark: "https://media.valorant-api.com/maps/224b0a95-48b9-f703-1bd8-67aca101a61f/stylizedbackgroundimage.png",
          light:
            "https://media.valorant-api.com/maps/224b0a95-48b9-f703-1bd8-67aca101a61f/premierbackgroundimage.png",
          name: "Abyss",
        },
        {
          dark: "https://media.valorant-api.com/maps/2fe4ed3a-450a-948b-6d6b-e89a78e680a9/stylizedbackgroundimage.png",
          light:
            "https://media.valorant-api.com/maps/2fe4ed3a-450a-948b-6d6b-e89a78e680a9/premierbackgroundimage.png",
          name: "Lotus",
        },
        {
          dark: "https://media.valorant-api.com/maps/92584fbe-486a-b1b2-9faa-39b0f486b498/stylizedbackgroundimage.png",
          light:
            "https://media.valorant-api.com/maps/92584fbe-486a-b1b2-9faa-39b0f486b498/premierbackgroundimage.png",
          name: "Sunset",
        },
        {
          dark: "https://media.valorant-api.com/maps/fd267378-4d1d-484f-ff52-77821ed10dc2/stylizedbackgroundimage.png",
          light:
            "https://media.valorant-api.com/maps/fd267378-4d1d-484f-ff52-77821ed10dc2/premierbackgroundimage.png",
          name: "Pearl",
        },
        {
          dark: "https://media.valorant-api.com/maps/756da597-416b-c0f2-f47b-afbdf28670bc/stylizedbackgroundimage.png",
          light:
            "https://media.valorant-api.com/maps/756da597-416b-c0f2-f47b-afbdf28670bc/premierbackgroundimage.png",
          name: "Summit",
        },
        {
          dark: "https://media.valorant-api.com/maps/e2ad5c54-4114-a870-9641-8ea21279579a/stylizedbackgroundimage.png",
          light:
            "https://media.valorant-api.com/maps/e2ad5c54-4114-a870-9641-8ea21279579a/premierbackgroundimage.png",
          name: "Icebox",
        },
        {
          dark: "https://media.valorant-api.com/maps/1c18ab1f-420d-0d8b-71d0-77ad3c439115/stylizedbackgroundimage.png",
          light:
            "https://media.valorant-api.com/maps/1c18ab1f-420d-0d8b-71d0-77ad3c439115/premierbackgroundimage.png",
          name: "Corrode",
        },
        {
          dark: "https://media.valorant-api.com/maps/2bee0dc9-4ffe-519b-1cbd-7fbe763a6047/stylizedbackgroundimage.png",
          light:
            "https://media.valorant-api.com/maps/2bee0dc9-4ffe-519b-1cbd-7fbe763a6047/premierbackgroundimage.png",
          name: "Haven",
        },
      ];
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
