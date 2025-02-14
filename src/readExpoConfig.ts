import { getConfig } from "@expo/config";
import type { CommandFlags } from "./cli/impl";

export const readExpoConfig = (options: CommandFlags) => {
    try {
        return getConfig(process.cwd(), { skipSDKVersionRequirement: true });
    } catch (e) {
        if (options.debug) {
            console.warn(`Error while reading config file:\n"${e instanceof Error ? e.message : ""}"\n`);
            console.warn(e);
        }
        return null;
    }
};
