/**
 * VIDEO #1 - Typescript Setup & Everyday Types
 */

/**
 * While hovering over a variable, press CMD+K and CMD+I to show type
 */


let userName: string = "Denis";
let hasLoggedIn: boolean = true;

// Error: Type 'string' is not assignable to type 'boolean'.
// hasLoggedIn += " Molloy";
// console.log('hasLoggedIn', hasLoggedIn)

userName += " Molloy";
console.log('userName', userName)

let myNumber: number = 10;

let myRegex: RegExp = /foo/;

/**
 * Typing arrays
 */
const names: string[] = userName.split(" ")
// Generic type
// Type 'string' is not assignable to type 'number'
// const myValues: Array<number> = ["a", 2, 3]
const myValues: Array<number> = [1, 2, 3]

/**
 * Typing Objects
 */
// created JS object, hovered over myPerson, CMD+K+I to get type def
const myPerson: {
    first: string;
    last: string;
} = {
    first: "Denis",
    last: "Molloy",
    // cool: true  //Object literal may only specify known properties, and 'cool' does not exist in type '{ first: string; last: string; }'
}

/**
 * Interfaces - reusable types
 */
// great hinting - when accessing properties (otherPerson. ), TS will show availabile properties
interface Person {
    first: string;
    last: string;
}
const otherPerson: Person = {
    first: "Denise",
    last: "Malloy"
}

/**
 * Maps
 */
// const ids={
//     10:"a",
//     20:"b"
// }
// ids[30]="c" //TS infers that 30 should be a string

// get around this issue by using a utility type: Record
// Needs to args: key type and value type
const ids: Record<number, string> = {
    10: "a",
    20: "b"
}
ids[30] = "c" //no error!

/**
 * Conditionals and Expressions
 */
// TS won't change the way you right conditionals (it will type check the values)
// if(ids[30]===20){ } //ERROR - This condition will always return 'false' since the types 'string' and 'number' have no overlap.'
if (ids[30] === "c") { }

//It only changes variable declarations

/**
 * Loops
 */
// you CAN type the iterator (let i:number = 0), but you should let TS infer as much as possible
for (let i = 0; i < 10; i++) {
    console.log(i)
}
// TS knows its an array of numbers so the param (v) for the forEach will be a number...let ts infer instead of typing 
[1, 2, 3].forEach(v => console.log(v));

// hovering over times10 shows "number[]", it knows that the result will be " number[]" based on the inputs
const times10= [4, 5, 6].map(v => v * 10)
// updating map to a template literal changes times10Str inferred type to "string[]"
const times10Str= [4, 5, 6].map(v => `${v * 10}`)
// typing times10Str as an array of numbers will throw an error

// const times10Str2:number[]= [4, 5, 6].map(v => `${v * 10}`) //Error - Type 'string[]' is not assignable to type 'number[]'.