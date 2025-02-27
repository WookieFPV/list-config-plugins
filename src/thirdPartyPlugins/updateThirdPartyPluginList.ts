import fs from "node:fs/promises";
import axios from "axios";

const fetchThirdPartyPackages = async (organization: string): Promise<string[]> => {
    const url = `https://registry.npmjs.org/-/org/${organization}/package`;
    const removePrefix = (name: string) => name.replace(`@${organization}/`, "");

    const response = await axios.get(url);
    return Object.keys(response.data).map(removePrefix).sort();
};

export const updateThirdPartyPluginList = async (organization: string) => {
    const thirdPartyPackages = await fetchThirdPartyPackages(organization);
    return fs.writeFile("src/thirdPartyPlugins/pluginList.json", JSON.stringify({ thirdPartyPackages }, null, 2));
};
