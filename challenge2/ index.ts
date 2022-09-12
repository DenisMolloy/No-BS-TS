/**
 * Reproduce Type Safe versions of forEach, filter, and map using reduce
 */

function myForEach<T>(items: T[], callback: (v: T) => void): void {
    items.reduce((a, v) => {
        callback(v)
        return null;
    }, null)

}

console.log(myForEach([2, 4, 6], (v) => console.log(v)))
// 2
// 4
// 6
// undefined

function myFilter<G>(items: G[], filterFunc: (v: G) => boolean): G[] {
    return items.reduce((a, v) => filterFunc(v) ? [...a, v] : a, [] as G[])
}

console.log(myFilter([1,2,3,4,5,6,7,8], (v)=> v % 2===0))
//[ 2, 4, 6, 8 ]


function myMap<T, K>(items: T[], mapFunc: (v: T) => K): K[] {
    return items.reduce((a, v) => [...a, mapFunc(v)], [] as K[])
}
const preMapped = [1, 2, 3];
const mapped = myMap(preMapped, (v) => (v * 10).toString());

console.log(mapped);
//[ '10', '20', '30' ]