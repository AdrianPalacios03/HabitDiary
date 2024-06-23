export const getRandomQuote = (lan: any) => {
    const quotes = lan.quotes
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    return randomQuote
}