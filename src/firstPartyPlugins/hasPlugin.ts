import { existsSync } from "node:fs";
import { nodeModulesFolders } from "./nodeModulesFolders";

export const hasFirstPartyPlugin = (pkg: string) =>
    nodeModulesFolders.some((path) => existsSync(`${path}/${pkg}/app.plugin.js`));
