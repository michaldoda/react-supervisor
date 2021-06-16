import {
    cast,
    isCastable,
} from "../src/cast";

test("cast not supported type", () => {
    expect(() => cast("castNotSupported")).toThrow("[ReactSupervisor] cast resolver not found.");
});

test("cast number", () => {
    expect(() => cast("castNumber", "256")).toThrow("[ReactSupervisor] missing property name.");
    expect(cast("castNumberAge", "256")).toEqual({ key: "age",  value: 256, });
    expect(cast("castNumberAge", "-256")).toEqual({ key: "age",  value: -256, });
});

test("cast boolean", () => {
    expect(() => cast("castBoolean", "true")).toThrow("[ReactSupervisor] missing property name.");
    expect(cast("castBooleanActive", "true")).toEqual({ key: "active",  value: true, });
    expect(cast("castBooleanActive", "1")).toEqual({ key: "active",  value: true, });
    expect(cast("castBooleanActive", "false")).toEqual({ key: "active",  value: false, });
    expect(cast("castBooleanActive", "0")).toEqual({ key: "active",  value: false, });
    expect(cast("castBooleanActive", "abcd")).toEqual({ key: "active",  value: null, });
    expect(cast("castBooleanActive", "null")).toEqual({ key: "active",  value: null, });
    expect(cast("castBooleanActive", "")).toEqual({ key: "active",  value: null, });
});

test("cast float", () => {
    expect(() => cast("castFloat", "3.14")).toThrow("[ReactSupervisor] missing property name.");
    expect(cast("castFloatPi", "3.14")).toEqual({ key: "pi",  value: 3.14, });
    expect(cast("castFloatPi", "3")).toEqual({ key: "pi",  value: 3, });
    expect(cast("castFloatPi", "abcd")).toEqual({ key: "pi",  value: NaN, });
    expect(cast("castFloatPi", "null")).toEqual({ key: "pi",  value: NaN, });
    expect(cast("castFloatPi", "")).toEqual({ key: "pi",  value: NaN, });
});

test("cast string", () => {
    expect(() => cast("castString", "helloworld")).toThrow("[ReactSupervisor] missing property name.");
    expect(cast("castStringPi", "3.14")).toEqual({ key: "pi",  value: "3.14", });
    expect(cast("castStringPi", "")).toEqual({ key: "pi",  value: "", });
});


test("cast json", () => {
    expect(() => cast("castJson", "[]")).toThrow("[ReactSupervisor] missing property name.");
    expect(cast("castJsonData", "[]")).toEqual({ key: "data",  value: [], });
    expect(cast("castJsonData", "")).toEqual({ key: "data",  value: null, });
    expect(cast("castJsonData", "[1,2,3,4]")).toEqual({ key: "data",  value: [1,2,3,4], });
    expect(cast("castJsonData", '{"first": 1, "second": "2"}')).toEqual({ key: "data",  value: { first: 1, second: "2", }, });
});

test("isCastable", () => {
    expect(isCastable("x")).toEqual(false);
    expect(isCastable("cAsT")).toEqual(false);
    expect(isCastable("cast")).toEqual(true);
});