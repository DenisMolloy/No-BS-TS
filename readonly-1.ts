/**
 * VIDEO #12 - Readonly And Immutability in Typescript
 */


interface Cat {
    // READONLY keyword
    // readonly name: string; // readonly makes a one property immutable
    name: string;
    breed: string;
}

/**
 * Readonly<Type>
 * Constructs a type with all properties of Type set to readonly, meaning the properties of the constructed type cannot be reassigned.
 */

type ReadonlyCat = Readonly<Cat>;

function makeCat(name: string, breed: string): ReadonlyCat {
    return {
        name,
        breed
    }
}

const dory = makeCat("Dory", "Jelykl")
// We can do this (before making the return object immutable||readonly), but we shouldn't be able to.  
// dory.name="Carlos" 


/**
 * readonly tuples
 */
// function makeCoordinate(x: number, y: number, z: number): [number, number, number] { //any of the indexes of the returned tuple can be reassigned
// function makeCoordinate(x: number, y: number, z: number): readonly [number, number, number] {  //or:
function makeCoordinate(x: number, y: number, z: number): Readonly<[number, number, number]> {
    return [x, y, z]
}
const c1 = makeCoordinate(10,20,30)
// c1[0]=20 //we shouldn't be able to reassign values to the tuple
// c1[0]=20 //Cannot assign to '0' because it is a read-only property.

/**
 * Immutable arrays
 */
// const reallyConst = [1,2,3]
// const reallyConst = readonly [1,2,3] //doesn't work
// const reallyConst = [1,2,3] as readonly; //doesn't work
const reallyConst = [1,2,3] as const; // telling TS the contents of the array are also const and immutable

// reallyConst[0] = 20 //before - while the value of reallyConst can't be changed,the values of the index can still be changed
// reallyConst[0] = 20  //after - ERROR: Cannot assign to '0' because it is a read-only property.





