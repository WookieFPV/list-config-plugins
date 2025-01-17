import Table from "cli-table3";
import type { PackageInfo } from "./types";

export const printPackagesTable = (data: PackageInfo[]) => {
    const table = new Table({head: ['used', 'package'], colAligns: ['center', 'left']});
    table.push(...sortPackages(data).map(({name, used}) => [used ? '🟩 ' : '🟥 ', name]));

    console.log('Config Plugin Overview:');
    console.log(table.toString())
}

export const printPackagesRaw = (packages: PackageInfo[]) => {
    console.log('\nConfig Plugin Overview');

    const usedPackages = packages.filter((pkg) => pkg.used);
    console.log('\nUsed packages:\n' + usedPackages.map((pkg) => `🟩  ${pkg.name}`).join('\n'));

    const unusedPackages = packages.filter((pkg) => !pkg.used);
    console.log('\nUnused packages:\n' + unusedPackages.map((pkg) => `🟥  ${pkg.name}`).join('\n'));
};

const sortPackages = (packages: PackageInfo[]) => {
    const usedPackages = packages.filter((pkg) => pkg.used);
    const unusedPackages = packages.filter((pkg) => !pkg.used);
    return [...usedPackages, ...unusedPackages];
}
