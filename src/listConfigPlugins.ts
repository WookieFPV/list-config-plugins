import type { CommandFlags } from "./cli/impl";
import { getPackagePluginList } from "./configPlugin/readPackages.js";
import { printPackages } from "./printData.js";
import { readExpoConfig } from "./readExpoConfig.js";

export const listConfigPlugins = (options: CommandFlags) => {
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
