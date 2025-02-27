import { getLegacyExpoPlugins } from "@expo/prebuild-config";
import { hasFirstPartyPlugin } from "../firstPartyPlugins/hasPlugin";
import { hasThirdPartyPlugin, thirdPartyPluginPrefix } from "../thirdPartyPlugins/communityConfigPlugins";
import type { ExpoCfg, ExpoPlugin, UsageType } from "../types/types";

const isPluginUsedStr = (pluginStr: string, pkg: string) => {
    if (pluginStr.startsWith(pkg)) return true;
    return pluginStr === `${thirdPartyPluginPrefix}${pkg}`;
};

const isPluginUsed = (plugin: NonNullable<ExpoPlugin>[0], pkg: string): boolean => {
    if (!plugin) return false;
    // startsWith is used because some plugins have a suffix for their config plugin name. e.g. @sentry/react-native has @sentry/react-native/expo as config plugin name
    if (typeof plugin === "string") return isPluginUsedStr(plugin, pkg);

    if (plugin[0] && isPluginUsedStr(plugin[0], pkg)) return true;
    return plugin[0]?.startsWith(pkg) ?? false;
};

const isPluginIncludedUsed = (pluginList: ExpoPlugin, pkg: string) =>
    pluginList?.some((plugin) => isPluginUsed(plugin, pkg)) ?? false;

export const getPluginImportType = (config: ExpoCfg, pkg: string): UsageType => {
    const isManuallyIncluded = isPluginIncludedUsed(config.exp.plugins, pkg);
    if (isManuallyIncluded) return "yes";

    const isAutoIncluded = getLegacyExpoPlugins().some((plugin) => plugin.startsWith(pkg));
    if (isAutoIncluded) return "auto";

    const hasThirdParty = hasThirdPartyPlugin(pkg);
    if (hasThirdParty) return "noButThirdParty";

    return "no";
};

export const hasConfigPlugin = (pkg: string) => {
    const hasFirstParty = hasFirstPartyPlugin(pkg);
    const hasThirdParty = hasThirdPartyPlugin(pkg);

    return hasFirstParty || hasThirdParty;
};
