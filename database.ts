/**
 * VIDEO #12 - Typescript Classes; Member Visibility and Implements
 */

// Interview Question!  create an in-memory, noSQL style database using JS/classes

interface Database{
    get(id:string): string;
    set(id:string, value: string):void;
}


// 1 interface implementation
class InMemoryDatabase implements Database{
    // member visibility to prevent directly accessing class properties
    // PRIVATE - only this class can see/change it
    // PROTECTED - this class or any of its desendants can see/change it
    // PUBLIC - default - free for all
    // private db: Record<string, string> = {}
    protected db: Record<string, string> = {} //need to update visibility so PersistentMemoryDB has access to this.db
    get(id:string): string{

        return this.db[id]
    }
    set(id:string, value: string):void{
        this.db[id]= value;
    }
}
// instantiate the db
const myDB = new InMemoryDatabase()
myDB.set("foo", "bar")
// myDB.db["foo"]="baz" //We shouldn't be able to do this.  Need to change db Member Visibility to PRIVATE
console.log(myDB.get("foo")) //baz

// 2 - extending existing classes 

// Persistable meaning we can read and write the state of the DB from a string
interface Persistable{
    saveToString():string;
    restoreFromString(storedState:string):void;
}

class PersistentMemoryDB extends InMemoryDatabase implements Persistable{
    saveToString():string{
        return JSON.stringify(this.db)
    }
    restoreFromString(storedState:string):void{
        this.db = JSON.parse(storedState)
    }
}
const myDB2 = new PersistentMemoryDB()
myDB2.set("foo", "bar")
console.log(myDB2.get("foo")) //bar
const saved = myDB2.saveToString() //{"foo":"bar"}


const myDB3 = new PersistentMemoryDB()
myDB3.restoreFromString(saved)
console.log(myDB3.get("foo")) //bar
