/**
 * @jest-environment jsdom
 */

import ReactSupervisorPackage from "../src/ReactSupervisor";
import React, {Fragment} from "react";
import * as ReactDOM from "react-dom";

const CLASS_NAME = "some-class-name";

it("must not be initialized by default", () => {
    const ReactSupervisor = new ReactSupervisorPackage();
    expect(ReactSupervisor.getIsInitialized()).toBe(false);
});

it("must be initialized by calling initialize() method", () => {
    const ReactSupervisor = new ReactSupervisorPackage();
    ReactSupervisor.initialize();
    expect(ReactSupervisor.getIsInitialized()).toBe(true);
});

test("default state", () => {
    const ReactSupervisor = new ReactSupervisorPackage();
    expect(ReactSupervisor.getComponents().length).toBe(0);
    expect(ReactSupervisor.getSlots().length).toBe(0);
    expect(ReactSupervisor.getIsInitialized()).toBe(false);
    expect(ReactSupervisor.getWatchInterval()).toBe(null);
});

test("registerComponent - without element that matches", () => {
    document.body.innerHTML = `
        <html lang="en">
        <body>
            <div></div>
        </body>
        </html>    
    `;
    const ReactSupervisor = new ReactSupervisorPackage();
    let ComponentToRender = Fragment;
    ReactSupervisor.registerComponent(`.${CLASS_NAME}`, ComponentToRender);
    ReactSupervisor.initialize();
    expect(ReactSupervisor.getComponents().length).toBe(1);
    expect(ReactSupervisor.getSlots().length).toBe(0);
});

test("registerComponent - with element that matches one element", () => {
    document.body.innerHTML = `
        <html lang="en">
        <body>
            <div class="${CLASS_NAME}"></div>
        </body>
        </html>    
    `;
    const ReactSupervisor = new ReactSupervisorPackage();
    let ComponentToRender = Fragment;
    ReactSupervisor.registerComponent(`.${CLASS_NAME}`, ComponentToRender);
    ReactSupervisor.initialize();
    expect(ReactSupervisor.getComponents().length).toBe(1);
    expect(ReactSupervisor.getSlots().length).toBe(1);
});

test("registerComponent - with element that matches multiple elements", () => {
    document.body.innerHTML = `
        <html lang="en">
        <body>
            <div class="${CLASS_NAME}"></div>
            <span class="${CLASS_NAME}"></span>
        </body>
        </html>    
    `;
    expect(document.querySelectorAll(`.${CLASS_NAME}.rendered`).length).toBe(0);
    const ReactSupervisor = new ReactSupervisorPackage();
    let ExampleEmptyComponent = Fragment;
    ReactSupervisor.registerComponent(`.${CLASS_NAME}`, ExampleEmptyComponent);
    ReactSupervisor.initialize();
    expect(ReactSupervisor.getComponents().length).toBe(1);
    expect(ReactSupervisor.getSlots().length).toBe(2);
});

test("registerComponent - if each slots have .rendered class after initialized", () => {
    document.body.innerHTML = `
        <html lang="en">
        <body>
            <div class="${CLASS_NAME}"></div>
            <span class="${CLASS_NAME}"></span>
        </body>
        </html>    
    `;
    expect(document.querySelectorAll(`.${CLASS_NAME}.rendered`).length).toBe(0);
    const ReactSupervisor = new ReactSupervisorPackage();
    let ExampleEmptyComponent = Fragment;
    ReactSupervisor.registerComponent(`.${CLASS_NAME}`, ExampleEmptyComponent);

    for (const slot of ReactSupervisor.getSlots()) {
        expect(slot.element.classList.contains("rendered")).toBe(false);
    }

    ReactSupervisor.initialize();

    for (const slot of ReactSupervisor.getSlots()) {
        expect(slot.element.classList.contains("rendered")).toBe(true);
    }
    expect(document.querySelectorAll(`.${CLASS_NAME}.rendered`).length).toBe(2);
});

test("registerComponentWithCustomRender - without element that matches", () => {
    const ReactSupervisor = new ReactSupervisorPackage();
    ReactSupervisor.registerComponentWithCustomRender(`.${CLASS_NAME}`, (el, props) => {
        ReactDOM.render(<Fragment {...props} />, el);
    });
    expect(ReactSupervisor.getComponents().length).toBe(1);
    expect(ReactSupervisor.getSlots().length).toBe(0);
});

test("registerComponentWithCustomRender - with element that matches", () => {
    document.body.innerHTML = `
        <html lang="en">
        <body>
            <div class="${CLASS_NAME}"></div>
            <span class="${CLASS_NAME}"></span>
        </body>
        </html>    
    `;

    const ReactSupervisor = new ReactSupervisorPackage();
    ReactSupervisor.registerComponentWithCustomRender(`.${CLASS_NAME}`, (el, props) => {
        ReactDOM.render(<Fragment {...props} />, el);
    });
    expect(ReactSupervisor.getComponents().length).toBe(1);
    ReactSupervisor.initialize();
    expect(ReactSupervisor.getSlots().length).toBe(2);
});