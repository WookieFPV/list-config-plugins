import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/cli/bin/cli.ts"],
    format: ["esm"],
    clean: true,
    splitting: false,
});
