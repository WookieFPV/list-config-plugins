import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/cli/bin/cli.ts", "src/cli/bin/bash-complete.ts"],
    format: ["esm"],
    clean: true,
});
