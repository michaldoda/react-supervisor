import {lowercaseFirstLetter} from "./lowercaseFirstLetter";

/**
 * {[object]}
 */
const castResolvers = [
    {
        name: "castNumber",
        handler: (value) => {
            return parseInt(value);
        },
    },
    {
        name: "castFloat",
        handler: (value) => {
            return parseFloat(value);
        },
    },
    {
        name: "castJson",
        handler: (value) => {
            if (value === "") {
                return null;
            } else {
                return JSON.parse(value);
            }
        },
    },
    {
        name: "castBoolean",
        handler: (value) => {
            if (value === "") {
                return null;
            } else if ((["true", "false"].includes(value.toString()))) {
                return value.toString() === "true";
            } else if ((["1", "0"].includes(value.toString()))) {
                return value.toString() === "1";
            } else {
                return null;
            }
        },
    },
    {
        name: "castString",
        handler: (value) => {
            return value;
        },
    },
];

/**
 * @param key {string}
 * @param value {any}
 * @constructor
 */
function CastDto(key, value) {
    this.key = key;
    this.value = value;
}


/**
 * @param key {string}
 * @param value {string}
 * @return {CastDto}
 */
const cast = (key, value) => {
    let castResolver = null;
    for (let i = 0; i < castResolvers.length; i++) {
        if (castResolvers[i].name === key.substr(0, castResolvers[i].name.length)) {
            castResolver = castResolvers[i];
            break;
        }
    }

    if (!castResolver) {
        throw new Error("[ReactSupervisor] cast resolver not found.");
    }

    let newKey = lowercaseFirstLetter(key.substr(castResolver.name.length));
    if (newKey === "") {
        throw new Error("[ReactSupervisor] missing property name.");
    }
    let newValue = castResolver.handler(value);

    return new CastDto(newKey, newValue);
};

/**
 * @param key
 * @return {boolean}
 */
const isCastable = (key) => {
    return key.substr(0, 4) === "cast";
};

export {
    cast,
    isCastable,
}