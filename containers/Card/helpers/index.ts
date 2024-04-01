export const validatedNumberCard = (numberCard: string): boolean => {
    const format = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/
    return format.test(numberCard)
}