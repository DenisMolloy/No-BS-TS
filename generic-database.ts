/**
 * VIDEO #15 - Generics in Typescript classes
 */

// Interview Question!  create an in-memory, noSQL style database using JS/classes

interface GenericDatabase<T, K>{
    get(id:K): T;
    set(id:K, value: T):void;
}

// prior to creating this type,Record<K, T> would throw an error: Type 'K' does not satisfy the constraint 'string | number | symbol'
type DBKeyType = string|number|symbol;
// 1 interface implementation
class InMemDatabase<T, K extends DBKeyType> implements GenericDatabase<T, K>{
    // initial error ob db: Type '{}' is not assignable to type 'Record<K, T>'
    // solve by adding "as Record<K, T>"
    // as is a type assertion
    protected db: Record<K, T> = {} as Record<K, T>
    get(id:K): T{
        return this.db[id]
    }
    set(id:K, value: T):void{
        this.db[id]= value;
    }
}

// Persistable meaning we can read and write the state of the DB from a string
interface Persistable{
    saveToString():string;
    restoreFromString(storedState:string):void;
}

class PersistentMemDB<T, K extends DBKeyType> extends InMemDatabase<T, K> implements Persistable{
    saveToString():string{
        return JSON.stringify(this.db)
    }
    restoreFromString(storedState:string):void{
        this.db = JSON.parse(storedState)
    }
}

const myDB4 = new InMemDatabase()
myDB4.set("foo", "bar")
console.log(myDB4.get("foo")) 

const myDB5 = new PersistentMemDB<number, string>()
myDB5.set("foo", 5)
const savedState = myDB5.saveToString()


const myDB6 = new PersistentMemDB<number, string>()
myDB6.restoreFromString(savedState)
console.log(myDB6.get("foo")) 
