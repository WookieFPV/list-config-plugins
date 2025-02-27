import fs from "node:fs";
import { nodeModulesFolders } from "./nodeModulesFolders";

export const hasFirstPartyPlugin = (pkg: string) =>
    nodeModulesFolders.some((path) => fs.existsSync(`${path}/${pkg}/app.plugin.js`));
