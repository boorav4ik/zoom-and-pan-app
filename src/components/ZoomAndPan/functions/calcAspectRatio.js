function greatestCommonDivisor(a, b) {
    return !b ? a : greatestCommonDivisor(b, a % b)
}

export default function (width, height) {
    if (height) {
        const gcb = greatestCommonDivisor(width, height)
        return `auto ${width / gcb}/${height / gcb}`
    }
    return "auto"
}