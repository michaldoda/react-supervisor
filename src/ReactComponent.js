/**
 *
 * @param selector {string}
 * @param component
 * @param isCustomRender {boolean}
 * @constructor
 */
function ReactComponent(selector, component, isCustomRender = false) {
    this.selector = selector;
    this.component = component;
    this.isCustomRender = isCustomRender;
}

export { ReactComponent };
