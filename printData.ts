import Table from "cli-table3";
import type {PackageInfo} from "./types.ts";

export const printPackagesTable = (data: PackageInfo[]) => {
    const table = new Table({head: ['used', 'package'], colAligns: ['center', 'left']});
    table.push(...data.map(({name, used}) => [used ? '🟩 ' : '🟥 ', name]));

    console.log('Config Plugin Overview:');
    console.log(table.toString())
}

export const printPackagesRaw = (packages: PackageInfo[]) => {
    console.log('Config Plugin Overview');
    console.log('===========================\n');
    const usedPackages = packages.filter((pkg) => pkg.used);
    console.log('Used packages:\n' + usedPackages.map((pkg) => `✅  ${pkg.name}`).join('\n'));

    const unusedPackages = packages.filter((pkg) => !pkg.used);
    console.log('Unused packages:\n' + unusedPackages.map((pkg) => `❌  ${pkg.name}`).join('\n'));
};
