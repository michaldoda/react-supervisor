/**
 *
 * @param element
 * @param reactComponent
 * @constructor
 */
function ReactSlot(element, reactComponent) {
    this.element = element;
    this.reactComponent = reactComponent;
    this.isRendered = false;
    this.hasFailed = false;
}

export { ReactSlot };
