import type { CommandFlags } from "../cli/impl";
import type { ExpoCfg, PackageInfo } from "../types/types.js";
import { getConfigPluginInfoText } from "./communityConfigPlugins";
import { getPluginImportType, hasConfigPlugin } from "./detectionHelpers.js";
import { nodeModulesFolders } from "./nodeModulesFolders";

export const getPackagePluginList = (config: ExpoCfg, options: CommandFlags): Array<PackageInfo> => {
    if (!config.pkg.dependencies) throw Error("No dependencies could be found by expo");
    const deps = Object.keys(config.pkg.dependencies);
    if (options.debug) console.debug("List of dependencies:", JSON.stringify(deps, null, 2));

    if (options.debug)
        console.debug("Searching for config plugins in these folders:", JSON.stringify(nodeModulesFolders, null, 2));

    const depsWithConfigPlugin = deps.filter(hasConfigPlugin);
    return depsWithConfigPlugin.map((name): PackageInfo => {
        const usage = getPluginImportType(config, name);
        if (usage === "noButThirdParty") return { name, usage, info: getConfigPluginInfoText(name) };
        return { name, usage };
    });
};
