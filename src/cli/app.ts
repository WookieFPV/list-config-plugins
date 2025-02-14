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
    },
    docs: {
        brief: description,
    },
});

export const app = buildApplication(command, {
    name,
    versionInfo: {
        currentVersion: version,
    },
});
