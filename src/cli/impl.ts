import { listConfigPlugins } from "../listConfigPlugins";
import type { LocalContext } from "./context";

export interface CommandFlags {
    readonly debug: boolean;
}

export default async function (this: LocalContext, flags: CommandFlags): Promise<void> {
    listConfigPlugins(flags);
}
