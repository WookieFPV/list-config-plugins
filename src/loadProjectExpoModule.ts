import { createRequire } from "node:module";
import { join } from "node:path";

export const loadProjectExpoModule = (projectRoot: string, specifier: string): unknown => {
    const projectRequire = createRequire(join(projectRoot, "package.json"));
    let projectModulePath: string | undefined;

    try {
        projectModulePath = projectRequire.resolve(specifier);
    } catch {
        // Some package managers keep Expo's transitive dependencies nested.
    }

    if (projectModulePath) return projectRequire(projectModulePath);

    const expoEntry = projectRequire.resolve("expo");
    return createRequire(expoEntry)(specifier);
};
