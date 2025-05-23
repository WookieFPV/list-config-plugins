import type { ConfigContext, ExpoConfig } from "@expo/config";

const USE_SENTRY = Boolean(process.env.SENTRY_AUTH_TOKEN);

// eslint-disable-next-line no-restricted-exports
export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    version: "0.0.01",
    name: "Bluesky",
    slug: "bluesky",
    scheme: "bluesky",
    owner: "blueskysocial",
    runtimeVersion: {
        policy: "appVersion",
    },
    icon: "./assets/app-icons/ios_icon_default_light.png",
    userInterfaceStyle: "automatic",
    primaryColor: "#1083fe",
    ios: {
        supportsTablet: false,
        bundleIdentifier: "xyz.blueskyweb.app",
        config: {
            usesNonExemptEncryption: false,
        },
        infoPlist: {
            UIBackgroundModes: ["remote-notification"],
            NSCameraUsageDescription: "Used for profile pictures, posts, and other kinds of content.",
            NSMicrophoneUsageDescription: "Used for posts and other kinds of content.",
            NSPhotoLibraryAddUsageDescription: "Used to save images to your library.",
            NSPhotoLibraryUsageDescription: "Used for profile pictures, posts, and other kinds of content",
            CFBundleSpokenName: "Blue Sky",
            CFBundleLocalizations: [
                "en",
                "an",
                "ast",
                "ca",
                "cy",
                "da",
                "de",
                "el",
                "eo",
                "es",
                "eu",
                "fi",
                "fr",
                "ga",
                "gd",
                "gl",
                "hi",
                "hu",
                "ia",
                "id",
                "it",
                "ja",
                "km",
                "ko",
                "ne",
                "nl",
                "pl",
                "pt-BR",
                "ro",
                "ru",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "yue",
                "zh-Hans",
                "zh-Hant",
            ],
        },
        entitlements: {
            "com.apple.developer.kernel.increased-memory-limit": true,
            "com.apple.developer.kernel.extended-virtual-addressing": true,
            "com.apple.security.application-groups": "group.app.bsky",
        },
        privacyManifests: {
            NSPrivacyAccessedAPITypes: [
                {
                    NSPrivacyAccessedAPIType: "NSPrivacyAccessedAPICategoryFileTimestamp",
                    NSPrivacyAccessedAPITypeReasons: ["C617.1", "3B52.1", "0A2A.1"],
                },
                {
                    NSPrivacyAccessedAPIType: "NSPrivacyAccessedAPICategoryDiskSpace",
                    NSPrivacyAccessedAPITypeReasons: ["E174.1", "85F4.1"],
                },
                {
                    NSPrivacyAccessedAPIType: "NSPrivacyAccessedAPICategorySystemBootTime",
                    NSPrivacyAccessedAPITypeReasons: ["35F9.1"],
                },
                {
                    NSPrivacyAccessedAPIType: "NSPrivacyAccessedAPICategoryUserDefaults",
                    NSPrivacyAccessedAPITypeReasons: ["CA92.1", "1C8F.1"],
                },
            ],
        },
    },
    androidStatusBar: {
        barStyle: "light-content",
    },
    // Dark nav bar in light mode is better than light nav bar in dark mode
    androidNavigationBar: {
        barStyle: "light-content",
    },
    android: {
        icon: "./assets/app-icons/android_icon_default_light.png",
        adaptiveIcon: {
            foregroundImage: "./assets/icon-android-foreground.png",
            monochromeImage: "./assets/icon-android-foreground.png",
            backgroundImage: "./assets/icon-android-background.png",
            backgroundColor: "#1185FE",
        },
        googleServicesFile: "./google-services.json",
        package: "xyz.blueskyweb.app",
        intentFilters: [
            {
                action: "VIEW",
                autoVerify: true,
                data: [
                    {
                        scheme: "https",
                        host: "bsky.app",
                    },
                ],
                category: ["BROWSABLE", "DEFAULT"],
            },
        ],
    },
    web: {
        favicon: "./assets/favicon.png",
    },
    plugins: [
        "expo-video",
        "expo-localization",
        ["react-native-edge-to-edge", { android: { enforceNavigationBarContrast: false } }],
        USE_SENTRY && [
            "@sentry/react-native/expo",
            {
                organization: "blueskyweb",
                project: "app",
                url: "https://sentry.io",
            },
        ],
        [
            "expo-build-properties",
            {
                ios: {
                    deploymentTarget: "15.1",
                    newArchEnabled: false,
                },
                android: {
                    compileSdkVersion: 35,
                    targetSdkVersion: 35,
                    buildToolsVersion: "35.0.0",
                    newArchEnabled: false,
                },
            },
        ],
        [
            "expo-notifications",
            {
                icon: "./assets/icon-android-notification.png",
                color: "#1185fe",
                sounds: process.env.EAS_BUILD_PLATFORM === "ios" ? ["assets/dm.aiff"] : ["assets/dm.mp3"],
            },
        ],
        "react-native-compressor",
        [
            "@bitdrift/react-native",
            {
                networkInstrumentation: true,
            },
        ],
        [
            "expo-font",
            {
                fonts: [],
            },
        ],
        ["expo-splash-screen"],
        ["expo-screen-orientation", { initialOrientation: "PORTRAIT_UP" }],
    ].filter(Boolean),
    extra: {
        eas: {
            build: {
                experimental: {
                    ios: {
                        appExtensions: [
                            {
                                targetName: "Share-with-Bluesky",
                                bundleIdentifier: "xyz.blueskyweb.app.Share-with-Bluesky",
                                entitlements: {
                                    "com.apple.security.application-groups": ["group.app.bsky"],
                                },
                            },
                            {
                                targetName: "BlueskyNSE",
                                bundleIdentifier: "xyz.blueskyweb.app.BlueskyNSE",
                                entitlements: {
                                    "com.apple.security.application-groups": ["group.app.bsky"],
                                },
                            },
                            {
                                targetName: "BlueskyClip",
                                bundleIdentifier: "xyz.blueskyweb.app.AppClip",
                            },
                        ],
                    },
                },
            },
            projectId: "55bd077a-d905-4184-9c7f-94789ba0f302",
        },
    },
});
