/**
 * VIDEO #7 - Tuples in TS
 */

type ThreeDCoordinate = [x: number, y: number, z: number]

function add3DCoordinates(c1: ThreeDCoordinate, c2: ThreeDCoordinate): ThreeDCoordinate {
    return [
        c1[0] + c2[0],
        c1[1] + c2[1],
        c1[2] + c2[2]
    ]
}
const coord1: ThreeDCoordinate = [1, 2, 3]
const coord2: ThreeDCoordinate = [10, 9, 8]
console.log(add3DCoordinates(coord1, coord2)) //[ 11, 11, 11 ]

/**
 * Tuples with different types
 */
// most common tuple used in react -> useState

function simpleStringState(initial: string): [() => string, (v: string) => void] {
    // note str is a closure
    let str: string = initial;
    return [
        () => str,
        (v: string) => { str = v }
    ]
}

const [string1Getter, string1Setter] = simpleStringState("WOOOOOW")
const [string2Getter, string2Setter] = simpleStringState("Hello")
console.log(string1Getter()) //WOOOOOW
console.log(string2Getter()) //Hello
string1Setter("YOOOOOOO")
string2Setter("Goodbye")
console.log(string1Getter()) //YOOOOOOO
console.log(string2Getter()) //Goodbye