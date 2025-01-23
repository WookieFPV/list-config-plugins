#!/usr/bin/env node
import { Command } from "commander";
import { listConfigPlugins } from "./listConfigPlugins";

const program = new Command();

program.name("list-config-plugins");

program.version(__VERSION__);

program.action(listConfigPlugins).description("List all Expo Config Plugins");

program.parse(process.argv);
