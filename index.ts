import {getConfig} from "@expo/config";
import {printPackagesTable} from "./printData.ts";
import {getPackagePluginList} from "./readPackages.ts";

const config = getConfig(__dirname, {skipSDKVersionRequirement: true});

const packages = getPackagePluginList(config);

console.log(JSON.stringify(packages));
printPackagesTable(packages);
