/**
 * @jest-environment jsdom
 */
import {extractProps} from "../src/extractProps";

test('extractProps tests', () => {
    document.body.innerHTML = `
    <div>
        <span id="username"
            data-cast-json-user='{"first_name": "Joe", "last_name": "Doe"}'
            data-cast-number-age="256"
            data-cast-string-string-age="256"
            data-cast-boolean-is-active="true"
            data-cast-boolean-is-inactive="false"
            data-cast-boolean-is-magic="1"
            data-cast-float-pi="3.14"
            data-without-cast="yeah"
        />
        <button id="button" />
    </div>
    `;

    let element = document.querySelector("#username");
    let extractedProps = extractProps(element);

    expect(extractedProps.user).toEqual({
        first_name: "Joe",
        last_name: "Doe",
    });
    expect(extractedProps.age).toEqual(256);
    expect(extractedProps.stringAge).toEqual("256");
    expect(extractedProps.pi).toEqual(3.14);
    expect(extractedProps.isActive).toEqual(true);
    expect(extractedProps.isInactive).toEqual(false);
    expect(extractedProps.isMagic).toEqual(true);
    expect(extractedProps.withoutCast).toEqual("yeah");

});

