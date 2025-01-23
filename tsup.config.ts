import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/bin.ts"],
    format: ["esm"],
    dts: false,
    define: {
        __VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    outDir: "dist",
    clean: true,
});
