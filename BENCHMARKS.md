# Benchmarks

Measure package-manager overhead separately from CLI execution. A direct executable and an `npx` command do not measure the same work: `npx` may resolve, download, verify, and install a package before starting the CLI.

## Direct execution

Build once, then compare JavaScript runtimes without package installation:

```sh
bun run build
hyperfine 'node dist/cli.js' 'bun dist/cli.js' --warmup 3
```

Run the benchmark from an Expo app so both commands inspect the same project.

## Warm npm execution

Install the packed artifact once and benchmark its linked executable:

```sh
npm pack
npm install --no-save ./list-config-plugins-*.tgz
hyperfine './node_modules/.bin/list-config-plugins' --warmup 3
```

## Cold npm execution

Use a dedicated disposable cache so the benchmark does not destroy the developer's normal npm cache:

```sh
benchmark_cache="$(mktemp -d)"
hyperfine \
  --prepare "rm -rf '$benchmark_cache'/*" \
  "npm_config_cache='$benchmark_cache' npx --yes list-config-plugins@latest"
```

Record packed size, production dependency count, direct execution, warm installed execution, and cold `npx` execution independently.

## Current baseline

Measured on 2026-08-11 from the repository's Expo fixture on macOS ARM64 with Node 24.13.0:

| Measurement | Result |
| --- | ---: |
| Direct `node ../dist/cli.js` | 313.6 ms ± 25.6 ms |
| Packed tarball | 17,923 bytes |
| Unpacked npm contents | 79,176 bytes |
| Production dependencies | 0 |
