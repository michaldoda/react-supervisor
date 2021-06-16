import {
    cast,
    isCastable,
} from "./cast";

/**
 * @param element {HTMLElement}
 * @return {Object}
 */
export const extractProps = (element) => {
    let result = {};

    for (const key in element.dataset) {
        if (element.dataset.hasOwnProperty(key)) {
            if (isCastable(key)) {
                let castedDto = cast(key, element.dataset[key]);
                result[castedDto.key] = castedDto.value;
            } else {
                result[key] = element.dataset[key];
            }
        }
    }

    return result;
};