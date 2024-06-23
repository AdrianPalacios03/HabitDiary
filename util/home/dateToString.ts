import monthNumberToName from "./monthNumberToName";

export const dateToString = (date: Date | undefined, lan: string = "en"): string => {
    if (!date) return ''
    const day = date.getDate();
    const month = monthNumberToName(date.getMonth() + 1, lan);
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}`
}