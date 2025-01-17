# list-config-plugins

See if packages have expo config plugins available and if you are using them.

## Example Output:

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


- Supports all types of expo configs

How it works:

1. If checks what packages you are using in your project (using information from expo)
2. Check if you are using expo config plugins


## Todo:
- \[ \] Monorepo support (might already work, not tested)
- \[ \] add support for more package managers (might also already work, not tested)
