import { ReactSlot } from "./ReactSlot";
import { ReactComponent } from "./ReactComponent";
import React from "react";
import * as ReactDOM from "react-dom";

function ReactSupervisor() {
    /**
     *
     * @type {ReactSlot[]}
     */
    let slots = [];
    /**
     *
     * @type {ReactComponent[]}
     */
    let components = [];
    /**
     *
     * @type {*}
     */
    let watchInterval;
    /**
     * @return void
     */
    const watch = () => {
        for (let i = 0; i < components.length; i++) {
            let elements = document.querySelectorAll(
                `${components[i].selector}:not(.rendered)`
            );
            for (let j = 0; j < elements.length; j++) {
                console.log(components[i]);
                renderReactSlot(elements[j], components[i]);
            }
        }
    };

    /**
     * @param element {HTMLElement}
     */
    const extractPropsFromDataset = (element) => {
        return element.dataset;
    };

    const renderReactSlot = (element, reactComponent) => {
        let slot = new ReactSlot(element, reactComponent);
        slot.element.classList.add("rendered");
        try {
            let props = extractPropsFromDataset(element);
            if (slot.reactComponent.isCustomRender) {
                slot.reactComponent.component(element, props);
            } else {
                let ComponentToRender = slot.reactComponent.component;
                ReactDOM.render(<ComponentToRender {...props} />, element);
            }

            slot.isRendered = true;
            console.info("[ReactSupervisor] ReactSlot has been rendered.");
        } catch (e) {
            slot.isRendered = true;
            slot.hasFailed = true;
            console.error("[ReactSupervisor] ReactSlot render has failed.");
        }
        slots.push(slot);
    };

    this.initialize = () => {
        this.forceRender();
        watchInterval = setInterval(watch, 5000);
        console.info("[ReactSupervisor] ReactSupervisor has been initialized.");
    };
    this.forceRender = () => {
        watch();
    };
    this.info = () => {
        console.table(slots);
        console.table(components);
        console.info(
            `Rendered count ${document.querySelectorAll(".rendered").length}`
        );
    };
    /**
     *
     * @param selector
     * @param component
     * @return void
     */
    this.registerComponent = (selector, component) => {
        let isAlreadyRegistered =
            components.filter((item) => {
                return item.selector === selector;
            }).length > 0;

        if (isAlreadyRegistered) {
            console.warn(
                `[ReactSupervisor] Selector: "${selector}" is already registered, item has been skipped.`
            );
            return;
        }

        components.push(new ReactComponent(selector, component));
        console.log("[ReactSupervisor] ReactComponent has been registered.");
    };

    this.registerComponentWithCustomRender = (selector, customRender) => {
        let isAlreadyRegistered =
            components.filter((item) => {
                return item.selector === selector;
            }).length > 0;

        if (isAlreadyRegistered) {
            console.warn(
                `[ReactSupervisor] Selector: "${selector}" is already registered, item has been skipped.`
            );
            return;
        }

        components.push(new ReactComponent(selector, customRender, true));
        console.log("[ReactSupervisor] ReactComponent has been registered.");
    }
}

export default new ReactSupervisor();
