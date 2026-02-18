import { describe, expect, it } from "bun:test";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const cliFile = `${process.cwd()}/src/cli/bin/cli.ts`;
const testProjectPath = `${process.cwd()}/__tests__`;

const runCli = async (cwd: string, args: string[] = []) => {
    const { stdout } = await execFileAsync("bun", [cliFile, ...args], { cwd });
    return stdout;
};

/**
 * These E2E Test use a real package json + app.config.js and a node_modules folder where everything is removed expect the config plugins files (this way CI is much faster because we can add those files to git instead of installing packages)
 */
describe("CLI Tests", () => {
    it("should show the correct config plugins", async () => {
        const stdout = await runCli(testProjectPath);
        expect(stdout).toMatchSnapshot();
    }, 20000);

    it("should show no config plugins in this package", async () => {
        const stdout = await runCli(process.cwd());
        expect(stdout.trim()).toEqual("Found no config plugins!");
    }, 20000);
});
