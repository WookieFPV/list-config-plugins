import { findWorkspacePackagesSync, findWorkspaceRootSync } from "@rnx-kit/tools-workspaces";

let cachedFolders: string[] | undefined;

/**
 * Resolved lazily (and memoized) instead of at import time, because the workspace lookup depends
 * on the current working directory, which should not be coupled to module import order.
 */
export const getNodeModulesFolders = (): string[] => {
    if (cachedFolders) return cachedFolders;

    cachedFolders = [findWorkspaceRootSync(), ...findWorkspacePackagesSync()]
        .filter(Boolean)
        .map((path) => `${path}/node_modules`);
    return cachedFolders;
};
