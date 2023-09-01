const re = /(?<x>-?\d+(\.\d+)?)px (?<y>-?\d+(\.\d+)?)px/

export default function (styleTranslate) {
    if (!styleTranslate) return { x: 0, y: 0 }
    const { x = 0, y = 0 } = styleTranslate.match(re)?.groups ?? {};

    return { x: Number(x), y: Number(y) }
}
