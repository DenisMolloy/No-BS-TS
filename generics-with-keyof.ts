/**
 * VIDEO #10 - Generics with keyof in TS
 */


// KeyType has to be one of the keys in DataType
function pluck<DataType, KeyType extends keyof DataType>(
    items:DataType[], 
    key:KeyType
    ):DataType[KeyType][]{
        return items.map(item=> item[key])
}

const dogs =[
    {name: "Jasper", age:12},
    {name: "Louis", age:5},
    {name: "Oscar", age:7},
]

// one passing second arg, as soon as you type ", it knows this value should be one of the keys available from the dogs array and shows autocomplete of "name" and "age"
console.log(pluck(dogs, "age"))
// [ 12, 5, 7 ]
console.log(pluck(dogs, "name"))
// [ 'Jasper', 'Louis', 'Oscar' ]


/**
 * Event Map
 */

interface BaseEvent{
    time: number;
    user:string;
}

interface EventMap {
    // & - adding the fields of BaseEvent to quantity & productId
    addToCart: BaseEvent & {quantity: number; productId: string; };
    checkout: BaseEvent
}

function sendEvent<Name extends keyof EventMap>(
    name:Name,
    data: EventMap[Name]
     ):void{
        console.log([name, data])
}
// The power of keyof is in the autocomplete.  For both args, as soon as you open quotes, it shows the available values for the first arg, and for the second arg after adding curlies and pressing Ctrl+Space, shows all available keys that need to be passed for that particular event
sendEvent("addToCart", {productId:"foo", quantity:5, time:1, user:"baz"})
sendEvent("checkout", {time:20, user:"bar"})

// sendEvent is checked.  You have to use the values defined in the interfaces or it will throw an error
// sendEvent("wishlist", "eggs") //Error - Argument of type '"wishlist"' is not assignable to parameter of type 'keyof EventMap'