/**
 * VIDEO #2 - Typescript Functions
 */

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
function addNumbers2(a: number, b: number): number {
    return a + b
}
// in TS we don't like module.exports
// module.exports= addNumbers //Cannot find name 'module'. Do you need to install type definitions for node? 
// export default addNumbers;
export default addNumbers2;


// export const addStrings = (str1: string, str2: string): string => `${str1} ${str2}`
/**
 * DEFAULT PARAMETERS
 */
export const addStrings = (str1: string, str2: string = ""): string => `${str1} ${str2}`

/**
 * UNION TYPES - param can be a string or number (if a number it will coerced into a string)
 */
export const format = (title: string, param: string | number): string => `${title} ${param}`

/**
 * VOID FUNCTIONS - specifying a type when a function doesn't return anything
 */
// export const printFormat= (title: string, param: string | number):string => console.log(`${title} ${param}`) //Error - "Void is not assignable to type string"
export const printFormat = (title: string, param: string | number): void => console.log(format(title, param))

/**
 * PROMISE FUNCTIONS - functions that return a promis
 */
export const fetchData = (url: string): Promise<string> => Promise.resolve(`Data from ${url}`)


/**
 * REST PARAMETERS
 */
export function introduce(salutation:string,...names:string[] ):string {
    return `${salutation}, ${names.join(", ")}`
}

// #1 Misconception - TS only enforces types at compile time! (not at run time)
// adding the optional chaining (?) ensures user is defined before we reference it
// can also include nullish coalescing  (??) to use a value if the left side is null | undefined
export function getName(user:{first:string; last:string;}):string{
    return `${user?.first ?? "No first name"} ${user?.last ?? "No last name"}`
}