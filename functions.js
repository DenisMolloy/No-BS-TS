"use strict";
/**
 * VIDEO #2 - Typescript Functions
 */
exports.__esModule = true;
exports.getName = exports.introduce = exports.fetchData = exports.printFormat = exports.format = exports.addStrings = void 0;
// functions defined and exported from this file and used in `function-test.ts`
/**
 * ANY TYPE - SHOULD ALWAYS AVOID!
 * a & b - implicitly have an "any" type as the type of the params can not be inferred
 * "any" types will throw
 */
// function addNumbers(a,b){
//     return a + b
// }
// TS implicitly types the return value as a number, but can also be explicit (shows how to do it with CMD+K+I)
function addNumbers2(a, b) {
    return a + b;
}
// in TS we don't like module.exports
// module.exports= addNumbers //Cannot find name 'module'. Do you need to install type definitions for node? 
// export default addNumbers;
exports["default"] = addNumbers2;
// export const addStrings = (str1: string, str2: string): string => `${str1} ${str2}`
/**
 * DEFAULT PARAMETERS
 */
var addStrings = function (str1, str2) {
    if (str2 === void 0) { str2 = ""; }
    return "".concat(str1, " ").concat(str2);
};
exports.addStrings = addStrings;
/**
 * UNION TYPES - param can be a string or number (if a number it will coerced into a string)
 */
var format = function (title, param) { return "".concat(title, " ").concat(param); };
exports.format = format;
/**
 * VOID FUNCTIONS - specifying a type when a function doesn't return anything
 */
// export const printFormat= (title: string, param: string | number):string => console.log(`${title} ${param}`) //Error - "Void is not assignable to type string"
var printFormat = function (title, param) { return console.log((0, exports.format)(title, param)); };
exports.printFormat = printFormat;
/**
 * PROMISE FUNCTIONS - functions that return a promis
 */
var fetchData = function (url) { return Promise.resolve("Data from ".concat(url)); };
exports.fetchData = fetchData;
/**
 * REST PARAMETERS
 */
function introduce(salutation) {
    var names = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        names[_i - 1] = arguments[_i];
    }
    return "".concat(salutation, ", ").concat(names.join(", "));
}
exports.introduce = introduce;
// #1 Misconception - TS only enforces types at compile time! (not at run time)
// adding the optional chaining (?) ensures user is defined before we reference it
// can also include nullish coalescing  (??) to use a value if the left side is null | undefined
function getName(user) {
    var _a, _b;
    return "".concat((_a = user === null || user === void 0 ? void 0 : user.first) !== null && _a !== void 0 ? _a : "No first name", " ").concat((_b = user === null || user === void 0 ? void 0 : user.last) !== null && _b !== void 0 ? _b : "No last name");
}
exports.getName = getName;
