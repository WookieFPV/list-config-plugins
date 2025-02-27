# list-config-plugins [![npm][npm-image]][npm-url] ![npm][npm-dl-stats]

A CLI tool to discover and manage Expo config plugins in your project dependencies.

## 🚀 Overview

`list-config-plugins` helps you efficiently manage your Expo config plugins by identifying which dependencies have available expo config plugins and whether they are currently utilized in your project. It supports:

- ✅ Expo Apps
- ✅ Bare React-Native Apps (without Expo)
- ✅ Monorepos

## 🎯 Usage

To get started, simply run the package in your app directory:

```bash
npx list-config-plugins@latest
```

### Example Output

```bash
> npx list-config-plugins
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
