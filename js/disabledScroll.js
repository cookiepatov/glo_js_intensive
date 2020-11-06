window.disableScroll = function (param) {
    document.body.style.cssText = `
        position:relative;
        overflow:hidden;
        height: 100vh;
    `;
}
window.enableScroll = function (param) {
    document.body.style.cssText = `
    `;
}


