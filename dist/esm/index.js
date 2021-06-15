import React from 'react';
import * as ReactDOM from 'react-dom';

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

/**
 *
 * @param selector {string}
 * @param handler
 * @constructor
 */
function ReactComponent(selector, handler) {
  this.selector = selector;
  this.handler = handler;
}

function ReactSupervisor() {
  var _this = this;

  /**
   *
   * @type {ReactSlot[]}
   */
  var slots = [];
  /**
   *
   * @type {ReactComponent[]}
   */

  var components = [];
  /**
   * @return void
   */

  var watch = function watch() {
    for (var i = 0; i < components.length; i++) {
      var elements = document.querySelectorAll("".concat(components[i].selector, ":not(.rendered)"));

      for (var j = 0; j < elements.length; j++) {
        console.log(components[i]);
        renderReactSlot(elements[j], components[i].handler);
      }
    }
  };

  var renderReactSlot = function renderReactSlot(element, handler) {
    var slot = new ReactSlot(element, handler);
    slot.element.classList.add("rendered");

    try {
      // slot.render();
      var ComponentToRender = handler;
      ReactDOM.render( /*#__PURE__*/React.createElement(ComponentToRender, element.dataset), element);
      slot.isRendered = true;
      console.info("[ReactSupervisor] ReactSlot has been rendered.");
    } catch (e) {
      slot.isRendered = false;
      slot.hasFailed = true; // console.error("[ReactSupervisor] ReactSlot render has failed.",e );
    }

    slots.push(slot);
  };

  this.initialize = function () {
    _this.forceRender();

    setInterval(watch, 5000);
    console.info("[ReactSupervisor] ReactSupervisor has been initialized.");
  };

  this.forceRender = function () {
    watch();
  };

  this.info = function () {
    console.table(slots);
    console.table(components);
    console.info("Rendered count ".concat(document.querySelectorAll(".rendered").length));
  };
  /**
   *
   * @param selector
   * @param renderHandler
   * @return void
   */


  this.registerComponent = function (selector, renderHandler) {
    var isAlreadyRegistered = components.filter(function (item) {
      return item.selector === selector;
    }).length > 0;

    if (isAlreadyRegistered) {
      console.warn("[ReactSupervisor] Selector: \"".concat(selector, "\" is already registered, item has been skipped."));
      return;
    }

    components.push(new ReactComponent(selector, renderHandler));
    console.log("[ReactSupervisor] ReactComponent has been registered.");
  };

  this.registerComponentWithCustomRender = function (selector, customRender) {
    var isAlreadyRegistered = components.filter(function (item) {
      return item.selector === selector;
    }).length > 0;

    if (isAlreadyRegistered) {
      console.warn("[ReactSupervisor] Selector: \"".concat(selector, "\" is already registered, item has been skipped."));
      return;
    }

    var element = document.querySelector(selector);
    customRender(element, element.dataset);
  };
}

var ReactSupervisor$1 = new ReactSupervisor();

export { ReactSupervisor$1 as ReactSupervisor };
//# sourceMappingURL=index.js.map
