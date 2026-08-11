import { dirname, join } from "node:path";

const findNodeModulesFolders = (startPath: string): string[] => {
    const folders: string[] = [];
    let currentPath = startPath;

    while (true) {
        folders.push(join(currentPath, "node_modules"));
        const parentPath = dirname(currentPath);
        if (parentPath === currentPath) return folders;
        currentPath = parentPath;
    }
};

export const nodeModulesFolders = findNodeModulesFolders(process.cwd());
