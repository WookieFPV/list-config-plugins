# list-config-plugins [![npm][npm-image]][npm-url] ![npm][npm-dl-stats]

Find Expo config plugins hidden in your dependencies and see which ones your app already uses.

`list-config-plugins` scans the current app, detects packages that expose Expo config plugins, and compares that list against your actual Expo config. It works well for Expo apps, bare React Native apps, and monorepos.

## Run It

Run the command from the app directory you want to inspect:

```bash
npx list-config-plugins@latest
```

## What It Shows

- Plugins already listed in your Expo config
- Plugins bundled by Expo
- Dependencies that expose config plugins but are currently unused
- Matching third-party plugins from the [`@config-plugins`](https://github.com/expo/config-plugins) ecosystem

## Example Output

```text
Config Plugin Overview:

Used Plugins:
🟩  expo-notifications
🟩  expo-screen-orientation
🟩  expo-splash-screen
🟩  react-native-compressor

Bundled with Expo:
📦  expo-camera
📦  expo-dev-client
📦  expo-file-system

Unused Plugins:
🟥  @sentry/react-native

Unused third party config plugin:
🟥  react-native-pdf ➡️  @config-plugins/react-native-pdf (https://github.com/expo/config-plugins/tree/main/packages/react-native-pdf)

```

## ✨ Features

- 🔍 Scans your project for available Expo config plugins
- 🟩 Displays currently used plugins
- 📦 Lists plugins automatically added by Expo
- 🟥 Identifies unused available plugins
- 🌐 Finds config plugins provided by [expo @config-plugins](https://github.com/expo/config-plugins)
- ⚙️ Supports all types of React-Native & Expo configurations, including Monorepos

## 🛠️ How It Works

1. Analyzes your project dependencies to identify packages with Expo config plugins.
2. Checks which config plugins are actively used in your Expo configuration.

[npm-image]: https://img.shields.io/npm/v/list-config-plugins
[npm-url]: https://www.npmjs.com/package/list-config-plugins
[npm-dl-stats]: https://img.shields.io/npm/dm/list-config-plugins
