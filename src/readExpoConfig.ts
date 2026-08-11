import type { getConfig } from "@expo/config";
import type { CommandFlags } from "./cli/impl";
import { loadProjectExpoModule } from "./loadProjectExpoModule";

type ExpoConfigModule = {
    getConfig?: typeof getConfig;
};

const loadProjectExpoConfig = (projectRoot: string): typeof getConfig => {
    const configModule = loadProjectExpoModule(projectRoot, "@expo/config") as ExpoConfigModule;
    if (!configModule.getConfig) throw new Error("The project's @expo/config package does not export getConfig");
    return configModule.getConfig;
};

export const readExpoConfig = (options: CommandFlags) => {
    try {
        const projectRoot = process.cwd();
        return loadProjectExpoConfig(projectRoot)(projectRoot, { skipSDKVersionRequirement: true });
    } catch (e) {
        if (options.debug) {
            console.warn(`Error while reading config file:\n"${e instanceof Error ? e.message : ""}"\n`);
            console.warn(e);
        }
        return null;
    }
};
