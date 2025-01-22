import { printPackagesRaw } from "./printData.js";
import { getPackagePluginList } from "./readPackages.js";
import { readExpoConfig } from "./readExpoConfig.js";


export const listConfigPlugins = () => {
    const config = readExpoConfig()
    if (!config) {
        console.log(
            "Unable to read Expo Config\n" +
            "Make sure your config is valid:\n\n" +
            "npx expo config  (see: https://docs.expo.dev/more/expo-cli/#config)");
        return
    }

    const packages = getPackagePluginList(config);
    printPackagesRaw(packages);
}

