import { buildApplication, buildCommand } from "@stricli/core";
import { description, name, version } from "../../package.json";

const command = buildCommand({
    loader: async () => import("./impl"),
    parameters: {
        flags: {
            debug: {
                kind: "boolean",
                brief: "output debugging info",
                default: false,
            },
        },
        aliases: {
            d: "debug",
        },
    },
    docs: {
        brief: description,
    },
});

export const app = buildApplication(command, {
    name,
    versionInfo: {
        currentVersion: version,
        getLatestVersion: async () => {
            try {
                const response = await fetch(`https://registry.npmjs.org/${name}/latest`, {
                    signal: AbortSignal.timeout(2000),
                });
                if (!response.ok) return undefined;
                const data = await response.json();
                if (!data || typeof data !== "object" || !("version" in data) || typeof data.version !== "string")
                    return undefined;
                return data.version;
            } catch {
                return undefined;
            }
        },
        upgradeCommand: `npx ${name}@latest`,
    },
});
