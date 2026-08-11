import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/cli/bin/cli.ts"],
    format: ["esm"],
    target: "node20",
    noExternal: ["@stricli/core"],
    splitting: false,
    clean: true,
});
