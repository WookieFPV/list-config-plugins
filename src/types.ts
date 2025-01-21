import { getConfig } from "@expo/config";

export type UsageType = "yes" | "auto" | "no"

export type PackageInfo = { name: string; used: UsageType }

export type ExpoCfg = ReturnType<typeof getConfig>

export type ExpoPlugin = ExpoCfg["exp"]["plugins"]
