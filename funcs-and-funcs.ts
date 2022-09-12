/**
 * VIDEO #3 - Typescript Functions with Functions
 */

/**
 * Function Parameters - supporting callbacks
 */
// initially 'callback' has an implicit type of 'any'
// '()=> void' is actually a type specification
export function printToFile(text: string, callback: () => void): void {
    console.log(text);
    callback()
}

/**
 * Function Params with Params
 */
// the callback type is hard to read so better to refactor with a function type
// export function arrayMutate(
//     numbers: number[],
//     mutate: (v: number) => number): number[] {
//     return numbers.map(mutate)
// }

// console.log(arrayMutate([1, 2, 3], (v) => v * 10))

/**
 * FUNCTIONS AS TYPES
 */
type MutationFunction = (v: number) => number

export function arrayMutate(
    numbers: number[],
    mutate: MutationFunction
): number[] {
    return numbers.map(mutate)
}

console.log(arrayMutate([1, 2, 3], (v) => v * 10))

/**
 * Function that returns a function
 */
export function createAdder(num:number):MutationFunction{
    return (val:number)=> num + val
}

const addOne = createAdder(1)
console.log(addOne(55)) //56
console.log(addOne(20)) //21