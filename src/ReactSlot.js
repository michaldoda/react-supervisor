/**
 *
 * @param element
 * @param handler
 * @constructor
 */
function ReactSlot(element, handler) {
    this.element = element;
    this.isRendered = false;
    this.hasFailed = false;
}

export { ReactSlot };
