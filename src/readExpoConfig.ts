import { createRequire } from "node:module";
import path from "node:path";
import { getConfig } from "@expo/config";
import type { CommandFlags } from "./cli/impl";

const getProjectConfigReader = (projectRoot: string): typeof getConfig => {
    try {
        const projectRequire = createRequire(path.join(projectRoot, "package.json"));
        const projectExpoConfig = projectRequire("@expo/config") as { getConfig?: typeof getConfig };
        if (projectExpoConfig.getConfig) {
            return projectExpoConfig.getConfig;
        }
    } catch {
        // Fall back to this package's @expo/config when the app does not expose one.
    }
    return getConfig;
};

export const readExpoConfig = (options: CommandFlags) => {
    try {
        const projectRoot = process.cwd();
        return getProjectConfigReader(projectRoot)(projectRoot, { skipSDKVersionRequirement: true });
    } catch (e) {
        if (options.debug) {
            console.warn(`Error while reading config file:\n"${e instanceof Error ? e.message : ""}"\n`);
            console.warn(e);
        }
        return null;
    }
};
