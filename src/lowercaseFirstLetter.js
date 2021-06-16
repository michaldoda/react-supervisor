/**
 * @param value
 * @return {string}
 */
export const lowercaseFirstLetter = (value) => {
    return value.charAt(0).toLowerCase() + value.substr(1);
}