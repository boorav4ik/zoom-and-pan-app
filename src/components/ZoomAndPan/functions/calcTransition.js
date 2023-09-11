export default (targetPosition, transition, deltaScale) => {
    const scale = transition.scale + deltaScale
    const calcTranslate = (coordinate) =>
        targetPosition[coordinate] -
        ((targetPosition[coordinate] - transition[coordinate]) * scale) / transition.scale

    return { scale, x: calcTranslate('x'), y: calcTranslate('y') }
}