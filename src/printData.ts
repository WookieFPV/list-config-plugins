import type { PackageInfo, UsageType } from "./types";

const emojiMapping: Record<UsageType, string> = {
    yes: "🟩",
    auto: "📦",
    no: "🟥",
};

const labelMapping: Record<UsageType, string> = {
    yes: "Used Plugins:",
    auto: "Bundled with Expo:",
    no: "Unused Plugins:",
};

const printGroup = (packages: PackageInfo[], group: UsageType) => {
    const usedPackages = packages.filter((pkg) => pkg.used === group);
    if (!usedPackages.length) return;
    console.log(`\n${labelMapping[group]}`);
    console.log(usedPackages.map((pkg) => `${emojiMapping[pkg.used]}  ${pkg.name}`).join("\n"));
};

export const printPackages = (packages: PackageInfo[]) => {
    if (!packages.length) {
        console.log("Found no config plugins!");
        return;
    }

    console.log("Config Plugin Overview:");
    printGroup(packages, "yes");
    printGroup(packages, "auto");
    printGroup(packages, "no");
};
