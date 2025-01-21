import fs from 'node:fs';
import type { ExpoCfg, ExpoPlugin, UsageType } from "./types";
import { getLegacyExpoPlugins } from "@expo/prebuild-config";

const isPluginIncludedUsed = (pluginList: ExpoPlugin, pkg: string) =>
     pluginList?.some(
        (plugin) => {
            if (typeof plugin === 'string' && plugin.startsWith(pkg)) return true
            if (plugin[0] === pkg) return true
            return plugin[0]?.startsWith(pkg);
        }
    ) ?? false


export const getPluginImportType = (config: ExpoCfg, pkg: string): UsageType => {
    const isManuallyIncluded = isPluginIncludedUsed(config.exp.plugins, pkg)
    if (isManuallyIncluded) return "yes"

    const isAutoIncluded = getLegacyExpoPlugins().some((plugin) => plugin.startsWith(pkg))
    if (isAutoIncluded) return "auto"

    return "no"
}


export const hasConfigPlugin = (pkg: string) => fs.existsSync(`node_modules/${pkg}/app.plugin.js`);
