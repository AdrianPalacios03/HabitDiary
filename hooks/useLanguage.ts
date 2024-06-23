import { es, en } from "@/translations"
import { getLocales } from "expo-localization";

export const useLanguage = () => {

    const { languageCode, languageTag } = getLocales()[0];

    let lan = en;
    if (languageCode === 'es') {
        lan = es;
    }

    return {
        lan,
        languageCode,
        languageTag
    }
}