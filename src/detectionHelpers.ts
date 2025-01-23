import fs from "node:fs";
import { getLegacyExpoPlugins } from "@expo/prebuild-config";
import { findNodeModuleFolders } from "./findNodeModules.js";
import type { ExpoCfg, ExpoPlugin, UsageType } from "./types";

const isPluginIncludedUsed = (pluginList: ExpoPlugin, pkg: string) =>
    pluginList?.some((plugin) => {
        if (typeof plugin === "string" && plugin.startsWith(pkg)) return true;
        if (plugin[0] === pkg) return true;
        return plugin[0]?.startsWith(pkg);
    }) ?? false;

export const getPluginImportType = (config: ExpoCfg, pkg: string): UsageType => {
    const isManuallyIncluded = isPluginIncludedUsed(config.exp.plugins, pkg);
    if (isManuallyIncluded) return "yes";

    const isAutoIncluded = getLegacyExpoPlugins().some((plugin) => plugin.startsWith(pkg));
    if (isAutoIncluded) return "auto";

    return "no";
};

const nodeModulesFolders = findNodeModuleFolders();

export const hasConfigPlugin = (pkg: string) =>
    nodeModulesFolders.some((path) => fs.existsSync(`${path}/${pkg}/app.plugin.js`));
