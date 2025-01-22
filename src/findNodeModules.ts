import fs from "node:fs";
import path from "node:path";

export const findNodeModuleFolders = () => {
    let currentPath = process.cwd();
    const nodeModulesPaths: string[] = [];

    while (currentPath !== path.parse(currentPath).root) {
        const nodeModulesPath = path.join(currentPath, "node_modules");
        if (fs.existsSync(nodeModulesPath)) nodeModulesPaths.push(nodeModulesPath);

        currentPath = path.dirname(currentPath);
    }
    return nodeModulesPaths;
}

