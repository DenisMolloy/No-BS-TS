/**
 * VIDEO #13 - Enums and Literal Types in Typescript
 */

// creating loading states
// these values are mutually exclusive...they shouldn't be separate values
// const beforeLoad = "beforeLoad";
// const loading = "loading";
// const loaded = "loaded";

// const isLoading = (state: string) => state === "loading";
// console.log(isLoading("dog")) // we can do this, but it doesn't help in any way.  

/**
 * ENUMS (Enumerations)
 */
enum LoadingState {
    beforeLoad = "beforeLoad",
    loading = "loading",
    loaded = "loaded",
}

const englishLoadingStates = {
    [LoadingState.beforeLoad]: "Before Load",
    [LoadingState.loading]: "Loading",
    [LoadingState.loaded]: "Loaded",
}

const isLoading = (state: LoadingState) => state === LoadingState.loaded;
// console.log(isLoading("dog")) //Argument of type '"dog"' is not assignable to parameter of type 'LoadingState'.
// note - autofill after typing LoadingState.
console.log(isLoading(LoadingState.beforeLoad)) //false
console.log(isLoading(LoadingState.loading)) //false
console.log(isLoading(LoadingState.loaded)) //true


/**
 * Literal Types
 */

// numeric literal
const rollDice = (dice: 1 | 2 | 3): number => {
    let pip = 0;
    for (let i = 0; i < dice; i++) {
        pip += Math.floor(Math.random() * 5) + 1
    }
    return pip
}

// console.log(rollDice(4)) // ERROR - Argument of type '4' is not assignable to parameter of type '1 | 2 | 3'

// string literal
// "addToCart" & "checkout" are string literal types
function sendEvent(name: "addToCart", data: {productId: number}):void;
function sendEvent(name: "checkout", data: {cartCount: number}):void;
function sendEvent(name: string, data: unknown):void {
    console.log(`${name}: ${JSON.stringify(data)}`)
}

// sendEvent("wishlist", {foo:222}) //ERROR - No overload matches this call.
sendEvent("addToCart",{productId:2222}) //no error