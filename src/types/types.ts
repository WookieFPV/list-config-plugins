import type { getConfig } from "@expo/config";

export type UsageType = "yes" | "auto" | "no" | "noButThirdParty";

export type PackageInfo = { name: string; usage: UsageType; info?: string };

export type ExpoCfg = ReturnType<typeof getConfig>;

export type ExpoPlugin = ExpoCfg["exp"]["plugins"];
