import { getConfig } from "@expo/config";

export const readExpoConfig = () => {
    try {
        return getConfig(process.cwd(), {skipSDKVersionRequirement: true});
    } catch (e) {
        return null
    }
}
