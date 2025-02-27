import thirdPartyPluginList from "./pluginList.json";

/**
 * Config Plugins provided by https://github.com/expo/config-plugins
 * This list must be kept in sync manually (script: updateThirdPartyPlugins)
 */
export const thirdPartyPlugins = thirdPartyPluginList.thirdPartyPackages;

export const hasThirdPartyPlugin = (pkg: string) => thirdPartyPlugins.includes(pkg);

const configPluginRepoLink = "https://github.com/expo/config-plugins/tree/main/packages";

export const thirdPartyPluginPrefix = "@config-plugins/";

export const getConfigPluginInfoText = (name: string) =>
    `➡️  ${thirdPartyPluginPrefix}${name} (${configPluginRepoLink}/${name})`;
