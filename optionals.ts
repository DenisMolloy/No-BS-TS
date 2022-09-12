/**
 * VIDEO #6 - Optionals in TS
 */

/**
 * OPTIONAL PARAMETERS
 */
// NOTE!: You can't add a required param after an optional param
function printIngredient(quantity:string, ingredient: string, extra?:string){
    console.log(`${quantity} - ${ingredient} ${extra? `- ${extra}` : ""}`)
}

printIngredient("1 Cup", "Sugar") //1 Cup - Sugar 
//ERROR (prior to adding extra? param) - Expected 2 arguments, but got 3.
printIngredient("1 Pinch", "Salt", "not a punch") // 1 Pinch - Salt - not a punch

/**
 * OPTIONAL FIELDS
 */
interface User{
    id:string;
    info?:{
        email?:string
    }
}

function getEmail(user:User): string{
    if(user.info){
        // Type 'string | undefined' is not assignable to type 'string'.
        // Type 'undefined' is not assignable to type 'string'.
        // essentially TS is saying there is a chance this property is undefined and we aren't being careful
        // return user.info.email;

        // "!" - telling TS that you know that the value will not be undefined
        // If you're using "!" a lot you probably aren't using TS correctly
        return user.info!.email!;
    }
    return ""
}

function getEmailEasy(user:User): string{
    return user?.info?.email ?? ""
}

/**
 * Optional Callbacks
 */
function addWithCallback(x:number, y:number, callback?:(num:number)=>void){
    console.log([x, y])
    // callback(); //ERROR: Cannot invoke an object which is possibly 'undefined'.
    callback?.(x+y)
}

addWithCallback(10,20, (num)=>console.log(num)) //[ 10, 20 ] \n 30
addWithCallback(100,200) //[ 100, 200 ]
