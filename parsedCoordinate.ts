/**
 * VIDEO #4 - Function Overloading in TS
 */


interface Coordinate {
    x: number;
    y: number;
}


// Problem - we should just have one function to parse the param into a Coordinate
// function parseCoordinateFromObject(obj: Coordinate): Coordinate {
//     return {
//         ...obj
//     }
// }
// function parseCoordinateFromNumbers(x: number, y: number): Coordinate {
//     return {
//         x, 
//         y
//     }
// }



// Solve the problem with FUNCTION OVERLOADING
// Note no implementation on these functions:
function parseCoordinate(obj: Coordinate): Coordinate;
function parseCoordinate(x: number, y: number): Coordinate;
function parseCoordinate(str:string): Coordinate;
// this function will handle and coerce the functions above
// UNKNOWN - is "any", but you  have to cast before you use it.  Kind of a 'safe' any
// Error: This overload signature is not compatible with its implementation signature. - this is because one parseCoordinate function has 1 arg and the other has two.  Fix by making one arg below optional i.e. "?"
function parseCoordinate(arg1: unknown, arg2?:unknown):Coordinate{
    let coord: Coordinate={
        x:0,
        y:0
    }
    if(typeof arg1 ==='object'){
      // Error - Spread types may only be created from object types.  Need to use the "as" keyword to tell TS that the arg is a coordinate
        // coord={
        //     ...arg1
        // }
        coord={
            ...(arg1 as Coordinate)
        }
    }else if(typeof arg1==='string'){
        (arg1 as string).split(",").forEach(str=>{
            const [key, value] = str.split(":")
            // Error - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Coordinate'.
            // coord[key]= parseInt(value, 10)
            coord[key as 'x' | 'y']= parseInt(value, 10)
        })
    }else{
        //Error - Type 'unknown' is not assignable to type 'number'.
        // coord={
        //     x: arg1,
        //     y:arg2
        // }
        coord={
            x: arg1 as number,
            y: arg2 as number
        }
    }
    return coord;
}

console.log(parseCoordinate({x:100, y:200})) //{ x: 100, y: 200 }
console.log(parseCoordinate(50, 100)) //{ x: 50, y: 100 }
// How do we handle a string variant
console.log(parseCoordinate("x:22,y:12")) //{ x: 22, y: 12 }
