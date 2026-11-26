// Registry of the pixelfx effects used on this site (https://github.com/patch-gg/pixelfx, MIT).
// Effects are loaded on demand so they never weigh down the first page load.

export type FxName =
  | "spark"
  | "burst"
  | "confetti"
  | "campfire"
  | "torch"
  | "portal"
  | "mana"
  | "rune"
  | "stars"
  | "lightning"
  | "firework"
  | "heart"
  | "coin";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type PixelCore = {
  createFrame: (w: number, h: number) => any;
  clearFrame: (frame: any) => any;
  createFx: (mod: any, options?: Record<string, unknown>) => PixelFxInstance;
  composite: (frame: any, out: Uint8ClampedArray, bg?: null) => unknown;
};

export type PixelFxInstance = {
  meta: { size: [number, number]; origin: [number, number]; duration: number; loop: boolean };
  update: (dt: number) => void;
  draw: (frame: any, layer?: "back" | "front") => void;
  stop: () => void;
  done: () => boolean;
};

export const loadCore = () =>
  import("@/vendor/pixelfx/core/index.js") as unknown as Promise<PixelCore>;

const EMERALD_7 = ["#021a12", "#04402b", "#066b47", "#00d294", "#6ff2c6", "#c9ffe9", "#ffffff"];
const EMERALD_8 = ["#021a12", "#04402b", "#066b47", "#00965f", "#00d294", "#6ff2c6", "#c9ffe9", "#ffffff"];

export const FX: Record<
  FxName,
  { load: () => Promise<unknown>; palette?: string[]; blurb: string }
> = {
  spark: {
    load: () => import("@/vendor/pixelfx/fx/impacts/hit-spark.js"),
    palette: EMERALD_7,
    blurb: "a crisp hit spark",
  },
  burst: {
    load: () => import("@/vendor/pixelfx/fx/pickups/collect-burst.js"),
    palette: EMERALD_8,
    blurb: "a sparkle burst",
  },
  confetti: {
    load: () => import("@/vendor/pixelfx/fx/ui/confetti.js"),
    blurb: "party poppers",
  },
  campfire: {
    load: () => import("@/vendor/pixelfx/fx/fire/campfire.js"),
    blurb: "a crackling campfire",
  },
  torch: {
    load: () => import("@/vendor/pixelfx/fx/fire/torch.js"),
    blurb: "a wall torch",
  },
  portal: {
    load: () => import("@/vendor/pixelfx/fx/arcane/portal.js"),
    blurb: "a swirling portal",
  },
  mana: {
    load: () => import("@/vendor/pixelfx/fx/arcane/mana-burst.js"),
    blurb: "a mana burst",
  },
  rune: {
    load: () => import("@/vendor/pixelfx/fx/arcane/rune-circle.js"),
    blurb: "a rune circle",
  },
  stars: {
    load: () => import("@/vendor/pixelfx/fx/arcane/star-fall.js"),
    blurb: "falling stars",
  },
  lightning: {
    load: () => import("@/vendor/pixelfx/fx/lightning/lightning-strike.js"),
    blurb: "a lightning strike",
  },
  firework: {
    load: () => import("@/vendor/pixelfx/fx/explosions/firework-burst.js"),
    blurb: "a firework",
  },
  heart: {
    load: () => import("@/vendor/pixelfx/fx/pickups/heart-pickup.js"),
    blurb: "a floating heart",
  },
  coin: {
    load: () => import("@/vendor/pixelfx/fx/pickups/coin-spin.js"),
    blurb: "a spinning coin",
  },
};

export const FX_NAMES = Object.keys(FX) as FxName[];
