# list-config-plugins

A CLI tool to identify and display Expo config plugins available in your project dependencies.

## Overview

This package helps you manage your Expo config plugins by showing which dependencies have available plugins and whether they're currently being used in your project.

## Usage

Simply run the package using npx in your Expo project directory:


```bash
npx list-config-plugins
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
```

## Features

- 🔍 Scans your project for available Expo config plugins
- ✅ Shows which plugins are currently in use
- 📦 Shows which plugins are automatically added by expo
- ❌ Identifies unused available plugins
- ⚙️ Supports all types of Expo configurations & Monorepos

## How It Works

1. Analyzes your project dependencies to identify packages with Expo config plugins.
2. Checks which config plugins are being used in your Expo configuration.

## Monorepo Support

Monorepos should work, this depends on where your config plugin are placed.
This package will search for config plugins in `./node_modules` and walk up the folder structure (`../node_modules`, `../../node_modules`, ...).
If your config plugins are there, it should work.


