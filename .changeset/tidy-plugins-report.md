---
"list-config-plugins": patch
---

Fix plugins being reported as used when a similarly named plugin is configured.

Package names were matched by prefix, so `plugins: ["expo-video-thumbnails"]` in your app config made an installed `expo-video` show up under "Used plugins" (and the same false positive could land a package under "Bundled with Expo:"). Matching now requires an exact name or a subpath, so config plugins like `@sentry/react-native/expo` are still detected.

Output polish: "Expo" is capitalized consistently, and plugin lines without info text no longer end in a trailing space.
