---
"list-config-plugins": patch
---

Make `list-config-plugins` faster and much smaller

- A first-time install is about 5.7x faster.
- Scanning is about 26% faster.
- The installed size drops from around 36 MB to 96 KB.
- The CLI now installs with no production dependencies.

JavaScript and TypeScript Expo configs continue to work as before. The CLI now uses the Expo version from your project and no longer checks npm for updates every time it runs.

Exact performance improvements will vary by project and network.
