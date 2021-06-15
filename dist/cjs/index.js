'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var ReactDOM = require('react-dom');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () {
                        return e[k];
                    }
                });
            }
        });
    }
    n['default'] = e;
    return Object.freeze(n);
}

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var ReactDOM__namespace = /*#__PURE__*/_interopNamespace(ReactDOM);

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
      ReactDOM__namespace.render( /*#__PURE__*/React__default['default'].createElement(ComponentToRender, element.dataset), element);
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

exports.ReactSupervisor = ReactSupervisor$1;
//# sourceMappingURL=index.js.map
