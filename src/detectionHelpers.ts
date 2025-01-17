import fs from 'node:fs';
import type { ExpoCfg } from "./types";

export const isPluginUsed = (config: ExpoCfg, pkg: string) =>
    config.exp.plugins?.some(
        (plugin) =>
            (typeof plugin === 'string' && plugin.startsWith(pkg)) || plugin[0] === pkg || plugin[0]?.startsWith(pkg)
    ) ?? false;

export const hasConfigPlugin = (pkg: string) => fs.existsSync(`node_modules/${pkg}/app.plugin.js`);
