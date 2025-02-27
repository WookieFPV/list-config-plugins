import type { PackageInfo, UsageType } from "./types/types";

const emojiMapping: Record<UsageType, string> = {
    yes: "🟩",
    auto: "📦",
    no: "🟥",
    noButThirdParty: "🟥",
};

const labelMapping: Record<UsageType, string> = {
    yes: "Used plugins:",
    auto: "Bundled with expo:",
    no: "Unused plugins:",
    noButThirdParty: "Unused third party config plugin:",
};

const printGroup = (packages: PackageInfo[], group: UsageType) => {
    const usedPackages = packages.filter((pkg) => pkg.usage === group);
    if (!usedPackages.length) return;
    console.log(`\n${labelMapping[group]}`);
    console.log(usedPackages.map((pkg) => `${emojiMapping[pkg.usage]}  ${pkg.name} ${pkg.info ?? ""}`).join("\n"));
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
    printGroup(packages, "noButThirdParty");
};
