import { getConfigPluginInfoText } from "./communityConfigPlugins";
import { getPluginImportType } from "./packageDetection/detectionHelpers.js";
import { hasConfigPlugin } from "./packageDetection/hasConfigPlugin";
import type { CliOptions, ExpoCfg, PackageInfo } from "./types.js";

export const getPackagePluginList = (config: ExpoCfg, options: CliOptions): Array<PackageInfo> => {
    if (!config.pkg.dependencies) throw Error("No dependencies could be found by expo");
    const deps = Object.keys(config.pkg.dependencies);
    if (options.debug) console.debug("List of dependencies:", JSON.stringify(deps, null, 2));

    const depsWithConfigPlugin = deps.filter(hasConfigPlugin);
    return depsWithConfigPlugin.map((name): PackageInfo => {
        const usage = getPluginImportType(config, name);
        if (usage === "noButThirdParty") return { name, usage, info: getConfigPluginInfoText(name) };
        return { name, usage };
    });
};
