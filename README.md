# list-config-plugins

A CLI tool to identify and display Expo config plugins available in your project dependencies.

## Overview

This package helps you manage your Expo config plugins by showing which dependencies have available plugins and whether they're currently being used in your project.

## Usage

Simply run the command in your Expo project directory:


```bash
npx list-config-plugins
```

### Example Output

```bash
  > npx list-config-plugins
Config Plugin Overview

Used packages:
🟩  expo-notifications
🟩  expo-screen-orientation
🟩  expo-splash-screen
🟩  react-native-compressor

Unused packages:
🟥  @sentry/react-native
🟥  expo-camera
🟥  expo-dev-client
🟥  expo-file-system
```

## Features

- 🔍 Scans your project for available Expo config plugins
- ✅ Shows which plugins are currently in use
- ❌ Identifies unused available plugins
- 📦 Supports all types of Expo configurations

## How It Works

1. Analyzes your project dependencies to identify packages with Expo config plugins
2. Checks which config plugins are being used in your Expo configuration

## Roadmap

- [ ] Monorepo support (might already work, not tested)
- [ ] Additional package manager support (might already work, not tested)

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.
