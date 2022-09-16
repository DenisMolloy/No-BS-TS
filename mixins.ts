/**
 * VIDEO #19 - Mixins in TS
 * https://www.typescriptlang.org/docs/handbook/mixins.html#handbook-content
 */


/**
 * Function creating functions
 */
function myLogFunction(){
    return (str:string)=>{
        console.log(str)
    }
}

const logger = myLogFunction()
logger("logging!") //logging!

/**
 * function create a class
 */
function createLoggerClass(){
    return class MyLoggerClass{
        private completeLog:string = "";

        log(str:string){
            // console.log(str)
            this.completeLog += `${str} \n`
        }

        dumpLog(){
            return this.completeLog
        }
    }
}

const MyLogger = createLoggerClass()
const logger2 = new MyLogger();
logger2.log("Wow this is new")
logger2.log("You learn something new every day")
console.log(logger2.dumpLog())
// Wow this is new 
// You learn something new every day 


/**
 * functions creating a generic class
 */
function CreateSimpleMemoryDatabase<T>(){
    return class SimpleDatabase{
        private db: Record<string, T> = {};

        set(id:string, value: T):void{
            this.db[id]= value;
        }

        get(id:string): T{
            return this.db[id]
        }

        getObject():object{
            return this.db
        }

    }
}

const StringDatabase = CreateSimpleMemoryDatabase<string>();
const sdb1 = new StringDatabase()
sdb1.set("foo", "bar")
sdb1.set("fizz", "buzz")
// sdb1.set("denis", 3); //Argument of type 'number' is not assignable to parameter of type 'string'.
console.log(sdb1.get("fizz")) //buzz
console.log(sdb1.getObject()) //{ foo: 'bar', fizz: 'buzz' }

/**
 * Creating a mixin
 * will take contents of the db and dumb it to the console
 */
type Constructor<T> = new (...args:any[]) => T

// defining that the Constructor must have a getObject method
function Dumpable<T extends Constructor<{
    getObject():object;
}>>(Base:T){
    return class Dumpable extends Base {
        dump(){
            console.log(this.getObject())
        }
    }
}

const DumpableStringDatabase = Dumpable(StringDatabase);

const sdb2 = new DumpableStringDatabase()
sdb2.set("foo", "bar")
sdb2.set("fizz", "buzz")
sdb2.dump() //{ foo: 'bar', fizz: 'buzz' }