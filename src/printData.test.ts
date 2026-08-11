import { afterEach, describe, expect, it, spyOn } from "bun:test";
import { printPackages } from "./printData";
import type { PackageInfo } from "./types/types";

const captureOutput = (packages: PackageInfo[]) => {
    const log = spyOn(console, "log").mockImplementation(() => {});
    printPackages(packages);
    const output = log.mock.calls.map((args) => args.join(" ")).join("\n");
    log.mockRestore();
    return output;
};

afterEach(() => {
    spyOn(console, "log").mockRestore();
});

describe("printPackages", () => {
    it("prints a hint when nothing was found", () => {
        expect(captureOutput([])).toBe("Found no config plugins!");
    });

    it("groups packages by usage in a stable order", () => {
        const output = captureOutput([
            { name: "unused-pkg", usage: "no" },
            { name: "third-party-pkg", usage: "noButThirdParty", info: "➡️  @config-plugins/third-party-pkg" },
            { name: "used-pkg", usage: "yes" },
            { name: "bundled-pkg", usage: "auto" },
        ]);

        expect(output).toContain("Config Plugin Overview:");
        expect(output.indexOf("Used plugins:")).toBeLessThan(output.indexOf("Bundled with expo:"));
        expect(output.indexOf("Bundled with expo:")).toBeLessThan(output.indexOf("Unused plugins:"));
        expect(output.indexOf("Unused plugins:")).toBeLessThan(output.indexOf("Unused third party config plugin:"));
    });

    it("omits empty groups", () => {
        const output = captureOutput([{ name: "used-pkg", usage: "yes" }]);

        expect(output).toContain("🟩  used-pkg");
        expect(output).not.toContain("Bundled with expo:");
        expect(output).not.toContain("Unused plugins:");
    });

    it("does not leave trailing whitespace on packages without info text", () => {
        const output = captureOutput([{ name: "used-pkg", usage: "yes" }]);

        expect(output).toContain("🟩  used-pkg");
        expect(output.split("\n").every((line) => line === line.trimEnd())).toBe(true);
    });

    it("appends the info text for third party plugins", () => {
        const output = captureOutput([
            { name: "react-native-pdf", usage: "noButThirdParty", info: "➡️  @config-plugins/react-native-pdf" },
        ]);

        expect(output).toContain("🟥  react-native-pdf ➡️  @config-plugins/react-native-pdf");
    });
});
