import { afterEach, describe, expect, test } from "bun:test";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import packageJson from "../package.json";

const cliPath = resolve(import.meta.dir, "../src/cli/bin/cli.ts");
const fixtures: string[] = [];

const writeJson = (path: string, value: unknown) => writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);

const createFixture = () => {
    const projectRoot = mkdtempSync(join(tmpdir(), "list-config-plugins-"));
    fixtures.push(projectRoot);
    writeJson(join(projectRoot, "package.json"), {
        name: "fixture-app",
        private: true,
        dependencies: {
            expo: "latest",
            "react-native-ble-plx": "latest",
        },
    });
    return projectRoot;
};

const writeModule = (projectRoot: string, modulePath: string, source: string) => {
    const directory = join(projectRoot, "node_modules", modulePath);
    mkdirSync(directory, { recursive: true });
    writeJson(join(directory, "package.json"), { main: "index.cjs" });
    writeFileSync(join(directory, "index.cjs"), source);
};

const runCli = (projectRoot: string, args: string[] = [], preload?: string) =>
    spawnSync(process.execPath, [...(preload ? ["--preload", preload] : []), cliPath, ...args], {
        cwd: projectRoot,
        encoding: "utf8",
        env: { ...process.env, NO_COLOR: "1" },
    });

afterEach(() => {
    for (const fixture of fixtures.splice(0)) rmSync(fixture, { recursive: true, force: true });
});

describe("list-config-plugins CLI", () => {
    test("uses the Expo config reader installed alongside the project's Expo package", () => {
        const projectRoot = createFixture();
        writeModule(projectRoot, "expo", "module.exports = {};\n");
        writeModule(
            projectRoot,
            "expo/node_modules/@expo/config",
            `const fs = require("node:fs");
const path = require("node:path");
exports.getConfig = (projectRoot) => ({
    exp: { plugins: ["react-native-ble-plx"] },
    pkg: JSON.parse(fs.readFileSync(path.join(projectRoot, "package.json"), "utf8")),
});
`,
        );

        const result = runCli(projectRoot);

        expect(result.status).toBe(0);
        expect(result.stdout).toContain("Used plugins:");
        expect(result.stdout).toContain("react-native-ble-plx");
        expect(result.stderr).toBe("");
    });

    test("uses the legacy plugin list installed alongside the project's Expo package", () => {
        const projectRoot = createFixture();
        writeModule(projectRoot, "expo", "module.exports = {};\n");
        writeModule(
            projectRoot,
            "expo/node_modules/@expo/config",
            `const fs = require("node:fs");
const path = require("node:path");
exports.getConfig = (projectRoot) => ({
    exp: { plugins: [] },
    pkg: JSON.parse(fs.readFileSync(path.join(projectRoot, "package.json"), "utf8")),
});
`,
        );
        writeModule(
            projectRoot,
            "expo/node_modules/@expo/prebuild-config",
            'exports.getLegacyExpoPlugins = () => ["react-native-ble-plx"];\n',
        );

        const result = runCli(projectRoot);

        expect(result.status).toBe(0);
        expect(result.stdout).toContain("Bundled with expo:");
        expect(result.stdout).toContain("react-native-ble-plx");
        expect(result.stderr).toBe("");
    });

    test("finds a config plugin installed in the app's node_modules", () => {
        const projectRoot = createFixture();
        writeJson(join(projectRoot, "package.json"), {
            name: "fixture-app",
            private: true,
            dependencies: {
                expo: "latest",
                "fixture-plugin": "latest",
            },
        });
        writeModule(projectRoot, "expo", "module.exports = {};\n");
        writeModule(
            projectRoot,
            "expo/node_modules/@expo/config",
            `const fs = require("node:fs");
const path = require("node:path");
exports.getConfig = (projectRoot) => ({
    exp: { plugins: ["fixture-plugin"] },
    pkg: JSON.parse(fs.readFileSync(path.join(projectRoot, "package.json"), "utf8")),
});
`,
        );
        writeModule(projectRoot, "fixture-plugin", "module.exports = {};\n");
        writeFileSync(join(projectRoot, "node_modules", "fixture-plugin", "app.plugin.js"), "module.exports = {};\n");

        const result = runCli(projectRoot);

        expect(result.status).toBe(0);
        expect(result.stdout).toContain("Used plugins:");
        expect(result.stdout).toContain("fixture-plugin");
        expect(result.stderr).toBe("");
    });

    test("does not contact the npm registry while showing help", () => {
        const projectRoot = createFixture();
        const markerPath = join(projectRoot, "fetch-called");
        const preloadPath = join(projectRoot, "preload.cjs");
        writeFileSync(
            preloadPath,
            `const fs = require("node:fs");
globalThis.fetch = () => {
    fs.writeFileSync(${JSON.stringify(markerPath)}, "called");
    return Promise.reject(new Error("unexpected fetch"));
};
`,
        );

        const result = runCli(projectRoot, ["--help"], preloadPath);

        expect(result.status).toBe(0);
        expect(result.stdout).toContain("list-config-plugins");
        expect(existsSync(markerPath)).toBe(false);
    });

    test("prints its version without loading the project", () => {
        const projectRoot = createFixture();

        const result = runCli(projectRoot, ["--version"]);

        expect(result.status).toBe(0);
        expect(result.stdout.trim()).toBe(packageJson.version);
        expect(result.stderr).toBe("");
    });

    test("rejects unknown flags", () => {
        const projectRoot = createFixture();

        const result = runCli(projectRoot, ["--unknown"]);

        expect(result.status).not.toBe(0);
        expect(result.stderr).toContain("--unknown");
    });

    test("supports app.config.ts through the project's Expo config package", () => {
        const projectRoot = createFixture();
        const expoScope = join(projectRoot, "node_modules", "@expo");
        mkdirSync(expoScope, { recursive: true });
        symlinkSync(resolve(import.meta.dir, "../node_modules/@expo/config"), join(expoScope, "config"), "dir");
        writeModule(projectRoot, "react-native-ble-plx", "module.exports = {};\n");
        writeFileSync(
            join(projectRoot, "node_modules", "react-native-ble-plx", "app.plugin.js"),
            "module.exports = (config) => config;\n",
        );
        writeFileSync(
            join(projectRoot, "app.config.ts"),
            `export default {
    name: "fixture-app",
    slug: "fixture-app",
    plugins: ["react-native-ble-plx"],
};
`,
        );

        const result = runCli(projectRoot);

        expect(result.status).toBe(0);
        expect(result.stderr).toBe("");
        expect(result.stdout).toContain("Used plugins:");
        expect(result.stdout).toContain("react-native-ble-plx");
    });

    test("works when a bare project has Expo config but not Expo prebuild config", () => {
        const projectRoot = createFixture();
        writeModule(
            projectRoot,
            "@expo/config",
            `const fs = require("node:fs");
const path = require("node:path");
exports.getConfig = (projectRoot) => ({
    exp: { plugins: [] },
    pkg: JSON.parse(fs.readFileSync(path.join(projectRoot, "package.json"), "utf8")),
});
`,
        );

        const result = runCli(projectRoot);

        expect(result.status).toBe(0);
        expect(result.stdout).toContain("Unused third party config plugin:");
        expect(result.stdout).toContain("react-native-ble-plx");
        expect(result.stderr).toBe("");
    });

    test("finds hoisted plugins when run from an app inside a monorepo", () => {
        const workspaceRoot = mkdtempSync(join(tmpdir(), "list-config-plugins-workspace-"));
        fixtures.push(workspaceRoot);
        const projectRoot = join(workspaceRoot, "apps", "mobile");
        mkdirSync(projectRoot, { recursive: true });
        writeJson(join(projectRoot, "package.json"), {
            name: "mobile",
            private: true,
            dependencies: {
                expo: "latest",
                "fixture-plugin": "latest",
            },
        });
        writeModule(workspaceRoot, "expo", "module.exports = {};\n");
        writeModule(
            workspaceRoot,
            "expo/node_modules/@expo/config",
            `const fs = require("node:fs");
const path = require("node:path");
exports.getConfig = (projectRoot) => ({
    exp: { plugins: ["fixture-plugin"] },
    pkg: JSON.parse(fs.readFileSync(path.join(projectRoot, "package.json"), "utf8")),
});
`,
        );
        writeModule(workspaceRoot, "fixture-plugin", "module.exports = {};\n");
        writeFileSync(join(workspaceRoot, "node_modules", "fixture-plugin", "app.plugin.js"), "module.exports = {};\n");

        const result = runCli(projectRoot);

        expect(result.status).toBe(0);
        expect(result.stdout).toContain("Used plugins:");
        expect(result.stdout).toContain("fixture-plugin");
        expect(result.stderr).toBe("");
    });
});
