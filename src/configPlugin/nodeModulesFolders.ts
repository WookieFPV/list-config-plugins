import { findWorkspacePackagesSync, findWorkspaceRootSync } from "@rnx-kit/tools-workspaces";

export const nodeModulesFolders = [findWorkspaceRootSync(), ...findWorkspacePackagesSync()]
    .filter(Boolean)
    .map((path) => `${path}/node_modules`);
