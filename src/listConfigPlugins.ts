import { printPackages } from "./printData.js";
import { readExpoConfig } from "./readExpoConfig.js";
import { getPackagePluginList } from "./readPackages.js";
import type { CliOptions } from "./types";

export const listConfigPlugins = (options: CliOptions) => {
    const config = readExpoConfig(options);
    if (!config) {
        console.log(
            "Unable to read Expo Config\n" +
                "Make sure your config is valid (run with --debug for more info)\n" +
                "npx list-config-plugins@latest --debug",
        );
        return;
    }

    const packages = getPackagePluginList(config, options);
    printPackages(packages);
};
