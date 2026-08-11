import { afterEach, describe, expect, test } from "bun:test";
import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const packageFixtures: string[] = [];

afterEach(() => {
    for (const fixture of packageFixtures.splice(0)) rmSync(fixture, { recursive: true, force: true });
});

describe("published package", () => {
    test("runs without installing production dependencies", () => {
        const packageRoot = mkdtempSync(join(tmpdir(), "list-config-plugins-package-"));
        packageFixtures.push(packageRoot);
        mkdirSync(join(packageRoot, "dist"));
        cpSync(resolve(import.meta.dir, "../dist"), join(packageRoot, "dist"), { recursive: true });
        writeFileSync(
            join(packageRoot, "package.json"),
            `${JSON.stringify({ name: "list-config-plugins", type: "module", bin: { "list-config-plugins": "dist/cli.js" } })}\n`,
        );

        const result = spawnSync("node", [join(packageRoot, "dist/cli.js"), "--help"], {
            cwd: packageRoot,
            encoding: "utf8",
            env: { ...process.env, NO_COLOR: "1" },
        });

        expect(result.status).toBe(0);
        expect(result.stdout).toContain("list-config-plugins");
        expect(result.stderr).toBe("");
    });
});
