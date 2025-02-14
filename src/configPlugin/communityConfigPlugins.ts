/**
 * Config Plugins provided by https://github.com/expo/config-plugins
 * This list must be kept in sync manually
 */
export const thirdPartyPlugins = [
    "android-jsc-intl",
    "apple-settings",
    "detox",
    "ffmpeg-kit-react-native",
    "ios-stickers",
    "react-native-adjust",
    "react-native-ble-plx",
    "react-native-blob-util",
    "react-native-branch",
    "react-native-callkeep",
    "react-native-dynamic-app-icon",
    "react-native-google-cast",
    "react-native-pdf",
    "react-native-quick-actions",
    "react-native-siri-shortcut",
    "react-native-webrtc",
    "tv",
];

export const getConfigPluginInfoText = (name: string) =>
    `➡️ ${thirdPartyPluginPrefix}${name} (https://github.com/expo/config-plugins/tree/main/packages/${name})`;

export const thirdPartyPluginPrefix = "@config-plugins/";
