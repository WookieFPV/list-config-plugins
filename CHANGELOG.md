# list-config-plugins

## [1.1.6](https://github.com/WookieFPV/list-config-plugins/compare/v1.1.5...v1.1.6) (2025-04-25)


### Bug Fixes

* re-enable tsup Code splitting to reduce bundle size. Result: 8.83 KB -&gt; 6.42 KB. ([17283f0](https://github.com/WookieFPV/list-config-plugins/commit/17283f01a336428bbfdfdfbd59ee7f0df5690754))

## [1.1.5](https://github.com/WookieFPV/list-config-plugins/compare/v1.1.4...v1.1.5) (2025-04-25)


### Bug Fixes

* reduce bundlesize (remove autocomplete that was not needed & enabled) ([1764190](https://github.com/WookieFPV/list-config-plugins/commit/17641900372278422cd9c256dc6f916249348794))
* update dependency @expo/prebuild-config to v8.2.0 ([#5](https://github.com/WookieFPV/list-config-plugins/issues/5)) ([34eb2f6](https://github.com/WookieFPV/list-config-plugins/commit/34eb2f6deaefa13b213e7752faf52c3a7a520e36))
* update example in Readme ([cd31d39](https://github.com/WookieFPV/list-config-plugins/commit/cd31d393be5df2f3bcecd7e3ae9106da0a799689))

## 1.1.4 (Feb 27, 2024)

### Bug Fixes

- Fix bug that prevented the discovery of community config plugins from @config-plugins/

## 1.1.3 (Feb 14, 2024)

### Improvements

- Improve monorepo support (by using rnx-kit to find packages)
- [Internal]: migrated to stricli (from commander) for typesafety

## 1.1.0 (Jan 24, 2024)

### Features

- suggests config plugins provided by expo @config-plugins/.
This is similar to how @types/ packages for typescript works.
This is useful if a package doesn't include a config plugin but there is a @config-plugins plugin available.
- add --debug option
Example:
```
Without bundled config Plugin but with third party config plugin:
🟥  react-native-google-cast ➡️ @config-plugins/react-native-google-cast (https://github.com/expo/config-plugins/tree/main/packages/react-native-google-cast)
  ```
## 1.0.2 (Jan 23, 2024)

### Improvements

- Improve error message if expo config is not valid
- Add --version & --help args
- [Internal] Improve bundling, linting with biome & tsup

## 1.0.1 (Jan 22, 2024)

### Bug Fixes

- Fixed an issue that caused the script to crash in some runtimes

## 1.0.0 (Jan 21, 2024)

### Features

- Added monorepo support

## 0.0.2 (Jan 21, 2024)

### Improvements

- Show config plugins bundled with expo

```
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
## 0.0.1 (Jan 20, 2024)

### Features

- Initial release

```
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
