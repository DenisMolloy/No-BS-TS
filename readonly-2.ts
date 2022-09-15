/**
 * VIDEO #17 - Readonly and static in TS Classes
 */

// long versiosn
// class Doggy{
//     public name: string = ""
//     public age: number = 0
//     constructor(name:string, age: number){
//          this.name=name;
//          this.age=age;
//     }
// }

// short version
class Doggy{
    // members in constructor
    public readonly foo:number=2;
    constructor(public readonly name:string, public readonly age: number){

    }
}
const louis = new Doggy("Louis", 4);
// louis.name="jasper" //need to lock down name as readonly
console.log(louis.name) //Louis
console.log(louis) //Doggy { name: 'Louis', age: 4, foo: 2 }


// DogList is a singleton - there can only be 1!
// Static -  The static members of a class are accessed using the class name and dot notation, without creating an object 
class DogList{
    private doggies: Doggy[]= [];
    static instance: DogList = new DogList()
    private constructor(){} //prevent users from making a new instance of DogList
    static addDog(dog:Doggy){
        DogList.instance.doggies.push(dog)
    }

    getDogs(){
        return this.doggies
    }
}
// const dl=new DogList() Constructor of class 'DogList' is private and only accessible within the class declaration.
DogList.addDog(louis)
const dogList = DogList.instance.getDogs()
console.log('dogList', dogList) //[ Doggy { name: 'Louis', age: 4, foo: 2 } ]
