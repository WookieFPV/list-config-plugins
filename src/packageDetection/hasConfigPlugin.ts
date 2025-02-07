import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);

const CONFIG_PLUGIN_FILE_NAME = "app.plugin.js";

export const hasConfigPlugin = (pkg: string): boolean => {
    try {
        const pkgPath = require.resolve(pkg);
        const pkgDir = path.dirname(pkgPath);

        const configPath = path.join(pkgDir, CONFIG_PLUGIN_FILE_NAME);
        return fs.existsSync(configPath);
    } catch (error) {
        console.log(error);
        return false;
    }
};
