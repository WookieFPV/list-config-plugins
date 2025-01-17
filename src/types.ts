import { getConfig } from "@expo/config";

export type PackageInfo = { name: string; used: boolean }

export type ExpoCfg = ReturnType<typeof getConfig>

export type ExpoPlugin = ExpoCfg["exp"]["plugins"]
