export default (
    { pageX, pageY },
    { offsetLeft, offsetTop, clientWidth, clientHeight },
) => ({
    x: -0.5 + (pageX - offsetLeft) / clientWidth,
    y: -0.5 + (pageY - offsetTop) / clientHeight,
})