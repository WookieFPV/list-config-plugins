import { describe, expect, it } from "bun:test";
import type { ExpoCfg, ExpoPlugin } from "../types/types";
import { getPluginImportType, hasConfigPlugin } from "./detectionHelpers";

/** getPluginImportType only reads `exp.plugins`, so a minimal config is enough here. */
const configWithPlugins = (plugins: ExpoPlugin): ExpoCfg => ({ exp: { plugins } }) as ExpoCfg;

describe("getPluginImportType", () => {
    describe('"yes" (listed in the expo config)', () => {
        it("matches a plain string entry", () => {
            const config = configWithPlugins(["react-native-compressor"]);
            expect(getPluginImportType(config, "react-native-compressor")).toBe("yes");
        });

        it("matches an entry with a config plugin suffix", () => {
            // @sentry/react-native ships its plugin as "@sentry/react-native/expo"
            const config = configWithPlugins(["@sentry/react-native/expo"]);
            expect(getPluginImportType(config, "@sentry/react-native")).toBe("yes");
        });

        it("matches a [name, options] tuple entry", () => {
            const config = configWithPlugins([["expo-build-properties", { android: { minSdkVersion: 24 } }]]);
            expect(getPluginImportType(config, "expo-build-properties")).toBe("yes");
        });

        it("matches a package used via its @config-plugins wrapper", () => {
            const config = configWithPlugins(["@config-plugins/react-native-pdf"]);
            expect(getPluginImportType(config, "react-native-pdf")).toBe("yes");
        });

        it("takes precedence over expo-bundled plugins", () => {
            const config = configWithPlugins(["expo-camera"]);
            expect(getPluginImportType(config, "expo-camera")).toBe("yes");
        });
    });

    describe('"auto" (bundled with expo)', () => {
        it("detects a legacy expo plugin that is not listed in the config", () => {
            expect(getPluginImportType(configWithPlugins([]), "expo-camera")).toBe("auto");
        });
    });

    describe('"noButThirdParty" (a @config-plugins package exists)', () => {
        it("detects an unused package covered by @config-plugins", () => {
            expect(getPluginImportType(configWithPlugins([]), "react-native-ble-plx")).toBe("noButThirdParty");
        });
    });

    describe('"no"', () => {
        it("reports an unused package with no known plugin source", () => {
            expect(getPluginImportType(configWithPlugins([]), "react-native-compressor")).toBe("no");
        });

        it("does not match an unrelated plugin entry", () => {
            const config = configWithPlugins(["expo-notifications"]);
            expect(getPluginImportType(config, "react-native-compressor")).toBe("no");
        });
    });

    describe("malformed plugin lists", () => {
        it("handles a missing plugins array", () => {
            expect(getPluginImportType(configWithPlugins(undefined), "react-native-compressor")).toBe("no");
        });

        it("skips null and empty entries instead of throwing", () => {
            const config = configWithPlugins([null, undefined, [], "react-native-compressor"] as never);
            expect(getPluginImportType(config, "react-native-compressor")).toBe("yes");
        });
    });
});

describe("hasConfigPlugin", () => {
    it("is true for packages covered by @config-plugins", () => {
        expect(hasConfigPlugin("react-native-ble-plx")).toBe(true);
    });

    it("is false for a package without any config plugin", () => {
        expect(hasConfigPlugin("this-package-does-not-exist")).toBe(false);
    });
});
