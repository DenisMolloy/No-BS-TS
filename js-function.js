/**
 * VIDEO #2 - Typescript Functions
 */


//used to illustrate compile time vs runtime
// this file won't run (error module not found) because "./functions" is a TS file.  
// Need to compile "./functions" into JS first using "npx tsc functions.ts"
const { getName } = require("./functions")

console.log(getName({first:"a", last:"b"})) //works

// console.log(getName()) //Cannot read property 'first' of undefined  
//this was run after the TS was compiled otherwise it would have caught the error first
// then add optional chaining in function def, then recompile
console.log(getName()) //undefined undefined
// can also include nullish coalescing  (??) to use a value if the left side is undefined
console.log(getName())// No first name No last name

