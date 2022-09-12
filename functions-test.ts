/**
 * VIDEO #2
 */

//Used for importing functions from function.ts
// import addNumbers from "./functions";
import addNumbers2, { addStrings, fetchData, introduce, getName } from "./functions";

// console.log(addNumbers(1,2)) // ERROR - Parameter 'a' implicitly has an 'any' type. |  Parameter 'b' implicitly has an 'any' type.
// console.log(addNumbers(1,"Denis")) // ERROR - Parameter 'a' implicitly has an 'any' type. |  Parameter 'b' implicitly has an 'any' type.

console.log(addNumbers2(1, 2))
// console.log(addNumbers2(1,"Denis")) //Error - Argument of type 'string' is not assignable to parameter of type 'number'.


console.log(addStrings("denis", "molloy"))
console.log(addStrings("denise")) //using the default param to handle no second arg

fetchData("www.googol.com").then(data => console.log(data))

console.log(introduce("WAZZUP", "denis", "elizabeth", "hilary"))

console.log(getName({ first: "denis", last: "molloy" })) //works no problem - now try js-function.ts