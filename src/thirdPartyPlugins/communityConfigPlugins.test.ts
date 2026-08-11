import { describe, expect, it } from "bun:test";
import { getConfigPluginInfoText, hasThirdPartyPlugin, thirdPartyPlugins } from "./communityConfigPlugins";

describe("thirdPartyPlugins list", () => {
    it("is not empty and stores unprefixed package names", () => {
        expect(thirdPartyPlugins.length).toBeGreaterThan(0);
        expect(thirdPartyPlugins.every((name) => !name.startsWith("@config-plugins/"))).toBe(true);
    });
});

describe("hasThirdPartyPlugin", () => {
    it("is true for a listed package", () => {
        expect(hasThirdPartyPlugin("react-native-pdf")).toBe(true);
    });

    it("is false for an unlisted package", () => {
        expect(hasThirdPartyPlugin("react-native-compressor")).toBe(false);
    });

    it("is false for the already prefixed name", () => {
        expect(hasThirdPartyPlugin("@config-plugins/react-native-pdf")).toBe(false);
    });
});

describe("getConfigPluginInfoText", () => {
    it("renders the prefixed package name and its repo link", () => {
        expect(getConfigPluginInfoText("react-native-pdf")).toBe(
            "➡️  @config-plugins/react-native-pdf (https://github.com/expo/config-plugins/tree/main/packages/react-native-pdf)",
        );
    });
});
