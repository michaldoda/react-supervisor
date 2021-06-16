import {lowercaseFirstLetter} from "../src/lowercaseFirstLetter";

test("lowercaseFirstLetter", () => {
    expect(lowercaseFirstLetter("TeSt")).toEqual("teSt");
    expect(lowercaseFirstLetter("test")).toEqual("test");
    expect(lowercaseFirstLetter("TEST")).toEqual("tEST");
    expect(lowercaseFirstLetter("")).toEqual("");
});