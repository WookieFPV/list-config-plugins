import { describe, expect, it } from "bun:test";
import { $ } from "zx";

/**
 * These E2E Test use a real package json + app.config.js and a node_modules folder where everything is removed expect the config plugins files (this way CI is much faster because we can add those files to git instead of installing packages)
 */
describe("CLI Tests", () => {
    it("should show the correct config plugins", async () => {
        const { stdout: node } = await $`node -v`;
        console.log(`node ${node.trim()}`);

        const { stdout: lcp } = await $`npx -y list-config-plugins@latest -v`;
        console.log(`list-config-plugins: ${lcp.trim()}`);

        const { stdout } = await $`npx -y list-config-plugins@latest`;

        if (process.cwd().endsWith("__tests__")) {
            console.log("Test Running in __tests__ folder expecting to find config plugins");
            expect(stdout).toMatchSnapshot();
        } else {
            console.log("Test Running in root folder expecting to find NO config plugins!");
            expect(stdout.trim()).toEqual("Found no config plugins!");
        }
    }, 20000);
});
