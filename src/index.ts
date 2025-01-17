import { getConfig } from "@expo/config";
import { printPackagesRaw } from "./printData.js";
import { getPackagePluginList } from "./readPackages.js";


export const listConfigPlugins = () => {
    const config = getConfig(process.cwd(), {skipSDKVersionRequirement: true});

    const packages = getPackagePluginList(config);

    printPackagesRaw(packages);
}

