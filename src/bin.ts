#!/usr/bin/env node
import { Command } from "commander";
import { listConfigPlugins } from "./listConfigPlugins";

const program = new Command();

program.name("list-config-plugins");

program.version(__VERSION__);

program
    .action((options) => listConfigPlugins(options))
    .option("-d, --debug", "output extra debugging", false)
    .description("List all Expo Config Plugins. Supports Expo & non expo (bare) React-Native Apps");

program.parse(process.argv);
