import {hasConfigPlugin, isPluginUsed} from "./detectionHelpers.ts";
import type {ExpoCfg} from "./types.ts";

export const getPackagePluginList = (config: ExpoCfg,) => {
    if (!config.pkg.dependencies) throw Error('No dependencies could be found by expo');
    const deps = Object.keys(config.pkg.dependencies);
    return deps.filter(hasConfigPlugin).map((name) => ({name, used: isPluginUsed(config, name)}));
};
