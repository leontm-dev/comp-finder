"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { API } from "@/services/api";
import { VlrEvent } from "@/types/event.type";
import { Maps } from "@/types/maps.enum";
import { CombResult } from "@/types/result.type";
import {
  Form,
  Field as FormischField,
  getInput,
  setInput,
  useForm,
  type SubmitHandler,
} from "@formisch/react";
import { ClockArrowUp, Search, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";
import * as v from "valibot";
import { FinderResult } from "./result";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useQueryState } from "nuqs";
import { encodeKAYO } from "@/lib/agent";

export function CombFinderSelectionComponent() {
  const [resultsOpen, setResultsOpen] = React.useState<boolean>(false);
  const [results, setResults] = React.useState<CombResult[]>([]);
  const [agents, setAgents] = React.useState<{ name: string; icon: string }[]>(
    [],
  );
  const [maps, setMaps] = React.useState<{ name: string; icon: string }[]>([]);
  const [currentPatch, setCurrentPatch] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [eventsLoading, setEventsLoading] = React.useState<boolean>(true);
  const [assetsLoading, setAssetsLoading] = React.useState<boolean>(true);
  const [events, setEvents] = React.useState<VlrEvent[]>([]);
  React.useEffect(() => {
    async function loadData() {
      setEventsLoading(true);

      try {
        const response = await API.Events.get();
        if (!response) return setEvents([]);

        setEvents(response);
        setEventsLoading(false);
      } catch (error) {
        console.log(error);
        setEventsLoading(false);
        toast.error("Couldn't load the events");
      }
    }

    loadData();
  }, []);
  const [eventSearch, setEventSearch] = React.useState<string>("");
  React.useEffect(() => {
    async function loadData() {
      setAssetsLoading(true);
      setAgents(
        (
          await fetch("https://valorant-api.com/v1/agents", {
            method: "GET",
          })
            .then((res) => res.json())
            .then((res) => res.data)
        )
          .filter(
            (e: { isPlayableCharacter: boolean }) => e.isPlayableCharacter,
          )
          .map((e: { displayName: string; displayIcon: string }) => ({
            name: e.displayName,
            icon: e.displayIcon,
          })),
      );
      setMaps(
        (
          await fetch("https://valorant-api.com/v1/maps", {
            method: "GET",
          })
            .then((res) => res.json())
            .then((res) => {
              return res.data;
            })
        )
          .filter((e: { displayName: string }) => {
            return Object.keys(Maps)
              .map((f) => f.toLowerCase())
              .includes(e.displayName.toLowerCase());
          })
          .map((e: { displayName: string; listViewIcon: string }) => ({
            name: e.displayName,
            icon: e.listViewIcon,
          })),
      );
      setCurrentPatch(
        parseFloat(
          String(
            (
              await fetch("https://valorant-api.com/v1/version", {
                method: "GET",
              })
                .then((res) => res.json())
                .then((res) => res.data)
            ).riotClientVersion,
          ).split("-")[1],
        ),
      );
      setAssetsLoading(false);
    }

    loadData();
  }, []);

  const SettingsFormSchema = v.object({
    map: v.pipe(v.string("Please select a map")),
    agents: v.pipe(
      v.array(v.string()),
      v.maxLength(5, "You can only select a maximum of five agents"),
      v.minLength(1, "Select at least one agent please"),
    ),
    events: v.pipe(v.array(v.string())),
    patch: v.pipe(v.optional(v.number())),
    patchBehavior: v.pipe(v.optional(v.string())),
    needsToHaveVod: v.pipe(v.optional(v.boolean())),
    winningState: v.pipe(v.optional(v.string())),
  });

  const [mapQueryParam, setMapQueryParam] = useQueryState<string | undefined>(
    "map",
    {
      defaultValue: undefined,
      serialize: (v) => v?.toLowerCase() || "",
      parse: (value) => {
        if (value.length === 0) return undefined;

        return value.toLowerCase();
      },
    },
  );
  const [eventsQueryParam, setEventsQueryParam] = useQueryState<string[]>(
    "events",
    {
      parse: (value) => {
        return value.split(",");
      },
      serialize: (value) => value.join(","),
      defaultValue: [],
    },
  );
  const [patchQueryParam, setPatchQueryParam] = useQueryState<
    number | undefined
  >("patch", {
    defaultValue: undefined,
    parse: (value) => {
      const modValue = parseFloat(value);
      if (isNaN(modValue)) return undefined;

      return modValue;
    },
  });
  const [agentsQueryParam, setAgentsQueryParam] = useQueryState<string[]>(
    "agents",
    {
      defaultValue: [],
      serialize: (value) => value.map((v) => encodeKAYO(v)).join(","),
      parse: (value) => {
        return value.split(",");
      },
    },
  );
  const [patchBehaviorQueryParam, setPatchBehaviorQueryParam] = useQueryState<
    string | undefined
  >("patchBehavior", {
    defaultValue: undefined,
    parse: (value) => {
      if (value.length === 0) return undefined;

      return value;
    },
  });
  const [needsToHaveVodQueryParam, setNeedsToHaveVodQueryParam] =
    useQueryState<boolean>("vod", {
      defaultValue: false,
      parse: (value) => value === "true",
      serialize: (value) => (value ? "true" : "false"),
    });
  const [winningStateQueryParam, setWinningStateQueryParam] = useQueryState<
    string | undefined
  >("winning", {
    defaultValue: undefined,
    parse: (value) => {
      if (value.length === 0) return undefined;

      return value;
    },
  });

  const form = useForm({
    schema: SettingsFormSchema,
    initialInput: {
      agents: agentsQueryParam,
      events: eventsQueryParam,
      map: mapQueryParam || undefined,
      needsToHaveVod: needsToHaveVodQueryParam,
      winningState: winningStateQueryParam || undefined,
      patch: patchQueryParam || undefined,
      patchBehavior: patchBehaviorQueryParam || undefined,
    },
  });

  const handleSubmit: SubmitHandler<typeof SettingsFormSchema> = (output) => {
    setLoading(true);
    API.Finder.findComb(
      output.agents,
      output.map.toString().toLowerCase(),
      output.events,
      output.winningState
        ? output.winningState === "won"
          ? "won"
          : output.winningState === "lost"
            ? "lost"
            : undefined
        : undefined,
      output.needsToHaveVod,
      output.patch,
      output.patchBehavior
        ? output.patchBehavior === "on"
          ? "on"
          : output.patchBehavior === "above"
            ? "above"
            : output.patchBehavior === "below"
              ? "below"
              : undefined
        : undefined,
    )
      .then((res) => {
        setLoading(false);
        toast.success(
          "Found some teams that are playing the agents you selected.",
        );
        setResults(res);
        setResultsOpen(true);
      })
      .catch((err) => {
        toast.error("Couldn't reach the backend. Try again later!");
        console.error(err);
        setLoading(false);
      });
  };
  return (
    <div className="relative flex h-full min-h-9/10 min-w-0 flex-1 flex-col items-center gap-4 border p-2 lg:flex-row lg:p-4">
      <Drawer
        open={resultsOpen}
        onOpenChange={setResultsOpen}
        direction="right"
      >
        <DrawerContent className="min-w-115 md:w-full">
          <DrawerHeader>
            <DrawerTitle>Search results</DrawerTitle>
            <DrawerDescription>
              {(results || []).length} individual results found. Click on them
              to open their vlr.gg page.
            </DrawerDescription>
            <div className="flex flex-row items-center gap-2 text-xs">
              <div className="flex flex-row items-center gap-1">
                <span className="bg-primary aspect-square h-4"></span>
                <span>Agent you selected</span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <span className="bg-muted aspect-square h-4"></span>
                <span>Agent not out of your selection</span>
              </div>
            </div>
          </DrawerHeader>
          {results.length === 0 && (
            <div className="flex h-full w-full flex-1 flex-col items-center justify-center bg-transparent">
              <p className="text-sm italic">
                No results found for your selection.
              </p>
            </div>
          )}
          <div className="no-scrollbar overflow-y-auto px-4">
            <Accordion
              multiple
              defaultValue={
                new Set(results.map((result) => result.event.title)).size === 1
                  ? [results[0].event.title]
                  : []
              }
            >
              {Array.from(new Set(results.map((result) => result.event.title)))
                .filter((event) => event !== null)
                .map((event) => {
                  const eventResults = results.filter(
                    (r) => r.event.title === event,
                  );
                  if (eventResults.length === 0) return <></>;
                  return (
                    <AccordionItem key={event} value={event}>
                      <AccordionTrigger>
                        <div className="flex flex-row items-center gap-1">
                          {eventResults[0].event.iconUrl && (
                            <Image
                              src={eventResults[0].event.iconUrl}
                              height={30}
                              width={30}
                              alt=""
                            />
                          )}
                          <p className="text-muted-foreground text-sm">
                            {eventResults[0].event.title}
                          </p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-1 flex-row items-center justify-evenly gap-2 py-4">
                          <span className="text-primary text-xs">
                            {eventResults.filter((r) => r.won).length} Wins
                          </span>
                          <span className="text-muted-foreground text-xs">
                            {eventResults.filter((r) => !r.won).length} Losses
                          </span>
                        </div>
                        {eventResults.map((result) => (
                          <FinderResult
                            result={result}
                            key={result.url + result.team.name}
                            agents={agents}
                            selectedAgents={getInput(form).agents}
                          />
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
            </Accordion>
          </div>
        </DrawerContent>
        <div className={cn("flex h-full flex-1 flex-col gap-4 p-4")}>
          <div className="mb-4 flex flex-col gap-0">
            <h1 className="decoration-primary text-xl underline">Find teams</h1>
            <p className="text-sm">
              Configure the search for teams by adjusting fields, filters and
              agents
            </p>
          </div>
          <Form
            of={form}
            onSubmit={handleSubmit}
            className={cn("flex flex-col gap-2")}
          >
            <FormischField of={form} path={["map"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel htmlFor="form-map">Map</FieldLabel>
                  {assetsLoading && (
                    <div className="flex flex-row items-center gap-2">
                      <Spinner /> Maps are being loaded in...
                    </div>
                  )}
                  {!assetsLoading && (
                    <Select
                      defaultValue={field.input}
                      name={field.props.name}
                      onValueChange={(value) => {
                        field.onChange(value || undefined);
                        setMapQueryParam(value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a map" />
                      </SelectTrigger>
                      <SelectContent>
                        {maps.map((map) => (
                          <SelectItem
                            value={
                              map.name.charAt(0).toUpperCase() +
                              map.name.slice(1)
                            }
                            key={map.name}
                          >
                            {map.name.charAt(0).toUpperCase()}
                            {map.name.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  <FieldDescription>
                    Select a map this team is playing on
                  </FieldDescription>
                  {field.errors && (
                    <FieldError
                      errors={field.errors.map((message) => ({ message }))}
                    />
                  )}
                </Field>
              )}
            </FormischField>
            <FormischField of={form} path={["agents"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel htmlFor="form-agents">Comb</FieldLabel>
                  {assetsLoading && (
                    <div className="flex flex-row items-center gap-2">
                      <Spinner /> Loading agents...
                    </div>
                  )}
                  {!assetsLoading && (
                    <ToggleGroup
                      className={"flex flex-row flex-wrap items-center gap-1"}
                      multiple
                      value={field.input}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setAgentsQueryParam(value);
                      }}
                    >
                      {agents.map((agent) => (
                        <Tooltip key={agent.name}>
                          <TooltipTrigger
                            render={
                              <ToggleGroupItem
                                disabled={
                                  field.input.length == 5 &&
                                  !field.input.includes(
                                    agent.name.toLowerCase(),
                                  )
                                }
                                size={"lg"}
                                className={"size-15 object-contain"}
                                value={agent.name.toLowerCase()}
                              >
                                <Image
                                  src={agent.icon}
                                  width={70}
                                  height={70}
                                  className={cn(
                                    field.input.length === 5 &&
                                      !field.input.includes(
                                        agent.name.toLowerCase(),
                                      ) &&
                                      "grayscale-100",
                                  )}
                                  alt=""
                                />
                              </ToggleGroupItem>
                            }
                          />
                          <TooltipContent>{agent.name}</TooltipContent>
                        </Tooltip>
                      ))}
                    </ToggleGroup>
                  )}
                  <FieldDescription>
                    Select up to five agents that should be in your comb
                  </FieldDescription>
                  {field.errors && (
                    <FieldError
                      errors={field.errors.map((message) => ({ message }))}
                    />
                  )}
                </Field>
              )}
            </FormischField>
            <FormischField of={form} path={["events"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel>Events</FieldLabel>
                  <div className="flex flex-col gap-2">
                    <InputGroup>
                      <InputGroupAddon>
                        <Search />
                      </InputGroupAddon>
                      <InputGroupInput
                        placeholder="Search..."
                        onChange={(ev) => setEventSearch(ev.target.value)}
                        defaultValue={eventSearch}
                        type="text"
                      />
                      {eventSearch.length > 0 && (
                        <InputGroupAddon align={"inline-end"}>
                          <InputGroupButton onClick={() => setEventSearch("")}>
                            <X />
                          </InputGroupButton>
                        </InputGroupAddon>
                      )}
                    </InputGroup>
                    {eventsLoading && (
                      <div className="flex flex-row items-center gap-2">
                        <Spinner /> Events are loading...
                      </div>
                    )}
                    {!eventsLoading && (
                      <ScrollArea className={"h-50"}>
                        <ToggleGroup
                          className={
                            "flex flex-row flex-wrap items-center gap-1"
                          }
                          value={field.input}
                          onValueChange={(value) => {
                            field.onChange(value);
                            setEventsQueryParam(value);
                          }}
                          multiple
                        >
                          {events
                            .filter((e) => {
                              if (field.input.includes(e.vlrId)) return true;

                              return e.title.includes(eventSearch);
                            })
                            .map((ev) => (
                              <ToggleGroupItem
                                value={ev.vlrId}
                                key={ev.vlrId}
                                className={"h-15"}
                                size="lg"
                              >
                                <div className="flex flex-row items-center gap-2">
                                  {ev.icon && (
                                    <Image
                                      src={ev.icon}
                                      alt="ev"
                                      width={40}
                                      height={40}
                                      className="size-10"
                                    />
                                  )}
                                  <div className="flex flex-col gap-0">
                                    <p className="text-md">{ev.title}</p>
                                    <p className="flex flex-row items-center gap-1">
                                      <Badge variant={"outline"}>
                                        {ev.region}
                                      </Badge>
                                    </p>
                                  </div>
                                </div>
                              </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                      </ScrollArea>
                    )}
                  </div>
                  <FieldDescription>
                    Select events in which the agents you selected should have
                    been played
                  </FieldDescription>
                  {field.errors && (
                    <FieldError
                      errors={field.errors.map((message) => ({ message }))}
                    />
                  )}
                </Field>
              )}
            </FormischField>
            <div
              className={cn(
                "grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
              )}
            >
              <FormischField of={form} path={["patch"]}>
                {(field) => (
                  <Field data-invalid={field.errors !== null}>
                    <FieldLabel>Patch</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <ClockArrowUp />
                      </InputGroupAddon>
                      <InputGroupInput
                        type="number"
                        step={0.01}
                        defaultValue={field.input}
                        onChange={(ev) => {
                          if (ev.target.value.length === 0) {
                            field.onChange(undefined);
                            setPatchQueryParam(null);
                            return;
                          }

                          setPatchQueryParam(parseFloat(ev.target.value));
                          return field.onChange(parseFloat(ev.target.value));
                        }}
                        ref={field.props.ref}
                        name={field.props.name}
                        onBlur={field.props.onBlur}
                      />
                      <InputGroupAddon align={"inline-end"}>
                        <InputGroupButton
                          disabled={assetsLoading && !!currentPatch}
                          onClick={() =>
                            setInput(form, {
                              input: currentPatch || undefined,
                              path: ["patch"],
                            })
                          }
                        >
                          Use current
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                    <FieldDescription>
                      Select a patch to be applied with the patch-behavior
                      selected
                    </FieldDescription>
                    {field.errors && (
                      <FieldError
                        errors={field.errors.map((message) => ({ message }))}
                      />
                    )}
                  </Field>
                )}
              </FormischField>
              <FormischField of={form} path={["patchBehavior"]}>
                {(field) => (
                  <Field data-invalid={field.errors !== null}>
                    <FieldLabel>Patch-Behavior: Consider games...</FieldLabel>
                    <Select
                      value={field.input}
                      name={field.props.name}
                      onValueChange={(value) => {
                        field.onChange(value || undefined);
                        setPatchBehaviorQueryParam(value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a patch-behavior" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={"above"}>
                          on and above this patch
                        </SelectItem>
                        <SelectItem value={"on"}>on this patch</SelectItem>
                        <SelectItem value={"below"}>
                          on and below this patch
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldDescription>
                      Patch behavior determines how the select patch is handle
                      in comparison to the games in our database
                    </FieldDescription>
                    {field.errors && (
                      <FieldError
                        errors={field.errors.map((message) => ({ message }))}
                      />
                    )}
                  </Field>
                )}
              </FormischField>
              <FormischField of={form} path={["needsToHaveVod"]}>
                {(field) => (
                  <Field data-invalid={field.errors !== null}>
                    <FieldLabel>Vod</FieldLabel>
                    <div className="flex flex-row items-center gap-2">
                      <Switch
                        defaultChecked={field.input}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          setNeedsToHaveVodQueryParam(checked);
                        }}
                        name={field.props.name}
                      />
                      <p className="text-md text-muted-foreground">
                        {field.input
                          ? "Require vods"
                          : "Select games with and without vods"}
                      </p>
                    </div>
                    <FieldDescription>
                      Require resulting games to have a vod available
                    </FieldDescription>
                    {field.errors && (
                      <FieldError
                        errors={field.errors.map((message) => ({ message }))}
                      />
                    )}
                  </Field>
                )}
              </FormischField>
              <FormischField of={form} path={["winningState"]}>
                {(field) => (
                  <Field data-invalid={field.errors !== null}>
                    <FieldLabel>State</FieldLabel>
                    <ToggleGroup
                      defaultValue={field.input ? [field.input] : ["both"]}
                      onValueChange={(value) => {
                        const v = value[0];
                        if (!v || v === "both") {
                          setWinningStateQueryParam(null);
                          field.onChange(undefined);
                          return;
                        }

                        setWinningStateQueryParam(v);
                        field.onChange(v);
                      }}
                    >
                      <ToggleGroupItem value="win">Only wins</ToggleGroupItem>
                      <ToggleGroupItem value="both">
                        Don&apos;t care
                      </ToggleGroupItem>
                      <ToggleGroupItem value="lost">
                        Only losses
                      </ToggleGroupItem>
                    </ToggleGroup>
                    <FieldDescription>
                      Require a certain game state, e.g. win or lose
                    </FieldDescription>
                    {field.errors && (
                      <FieldError
                        errors={field.errors.map((message) => ({ message }))}
                      />
                    )}
                  </Field>
                )}
              </FormischField>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Button disabled={loading} type="submit" className={"w-min"}>
                {loading ? (
                  "Loading... "
                ) : (
                  <>
                    <Search />
                    Find teams with a similar comb
                  </>
                )}
              </Button>
              <DrawerTrigger asChild>
                <Button variant={"secondary"}>Show results</Button>
              </DrawerTrigger>
            </div>
          </Form>
        </div>
      </Drawer>
    </div>
  );
}
