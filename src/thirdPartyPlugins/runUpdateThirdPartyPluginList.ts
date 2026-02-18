import { updateThirdPartyPluginList } from "./updateThirdPartyPluginList";

try {
    await updateThirdPartyPluginList("config-plugins");
} catch (e) {
    console.error("Failed to update third party plugin list");
    console.error(e);
    process.exitCode = 1;
}
