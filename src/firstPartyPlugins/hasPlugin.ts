import fs from "node:fs";
import { getNodeModulesFolders } from "./nodeModulesFolders";

export const hasFirstPartyPlugin = (pkg: string) =>
    getNodeModulesFolders().some((path) => fs.existsSync(`${path}/${pkg}/app.plugin.js`));
