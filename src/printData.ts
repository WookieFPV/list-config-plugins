import type { PackageInfo, UsageType } from "./types";

const sortPackages = (packages: PackageInfo[]) => {
    const usedPackages = packages.filter((pkg) => pkg.used === "yes");
    const autoPackages = packages.filter((pkg) => pkg.used === "auto")
    const unusedPackages = packages.filter((pkg) => pkg.used === "no");
    return [...usedPackages, ...autoPackages, ...unusedPackages];
}

const emojiMapping: Record<UsageType, string> = {
    yes: "🟩",
    auto: "📦",
    no: "🟥"
}

const packageToString = (pkg: PackageInfo) => `${emojiMapping[pkg.used]}  ${pkg.name}`

export const printPackagesRaw = (packages: PackageInfo[]) => {
    console.log('Config Plugin Overview:');

    const usedPackages = packages.filter((pkg) => pkg.used === "yes");
    if (usedPackages.length) {
        console.log('\nUsed Plugins:\n' + usedPackages.map((pkg) => packageToString(pkg)).join('\n'));
    }

    const autoPackages = packages.filter((pkg) => pkg.used === "auto");
    if (autoPackages.length) {
        console.log('\nBundled with Expo:\n' + autoPackages.map((pkg) => packageToString(pkg)).join('\n'));
    }

    const unusedPackages = packages.filter((pkg) => pkg.used === "no");
    if (unusedPackages.length) {
        console.log('\nUnused Plugins:\n' + unusedPackages.map((pkg) => packageToString(pkg)).join('\n'));
    }

};

