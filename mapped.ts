/**
 * VIDEO #16 - Mapped Types in TS
 */


// TYPES WITH FLEXIBLE FIELDS
// option 1
// type MyFlexibleDogInfo = {
//     name: string;
//     // & Merging MyFlexibleDogInfo and the Record Utility type
//     // Constructs an object type whose property keys are Keys and whose property values are Type. This utility can be used to map the properties of a type to another type.
// } & Record<string, string>

// option 2
type MyFlexibleDogInfo = {
    name: string;
    [key:string]: string | number;
}

const dog: MyFlexibleDogInfo={
    name: "Jasper",
    breed: "Shih Tzu",
    age: 7
}


// MAPPED TYPES - https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#handbook-content


interface DogInfo {
    name: string;
    age:number;
}
// OptionsFlags - directly from Mapped Types documentation
type OptionsFlags<Type> = {
    [Property in keyof Type]: boolean;
};

type DogInfoOptions = OptionsFlags<DogInfo>
// CMD+K+I
// type DogInfoOptions = {
//     name: boolean;
//     age: boolean;
// }


type Listeners<T> = {
    // TEMPLATE LITERAL
    // without the template literal, DogInfoListeners tool tip shows:
    // type DogInfoListeners = {
    //     name: (newValue: string) => void;
    //     age: (newValue: number) => void;
    // }
    // but adding the template literal shows "onnameChange" "onageChange"
    // need to use the Capitalize utility
    [Property in keyof T as `on${Capitalize<string & Property>}Change`]?: (newValue: T[Property])=>void;
} & {
    [Property in keyof T as `on${Capitalize<string & Property>}Delete`]?: ()=>void;
}

function listenToObject<T>(obj: T, listeners: Listeners<T>):void{
    throw "Write me"
}

const lg: DogInfo = {
    name:"LG",
    age:13
}

type DogInfoListeners = Listeners<DogInfo>;
listenToObject(lg, {
    onNameChange: (v:string)=>{},
    onAgeChange:(v:number)=>{},
    onAgeDelete:()=>{},
    onNameDelete:()=>{}
})