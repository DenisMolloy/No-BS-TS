/**
 * VIDEO 22 - Utility Types in Typescript - Part 2
 */
//  https://www.typescriptlang.org/docs/handbook/utility-types.html

/**
 * Parameters<Type>
 * Constructs a tuple type from the types used in the parameters of a function type Type.
 */
/**
 * ConstructorParameters<Type>
 * Constructs a tuple or array type from the types of a constructor function type. It produces a tuple type with all the parameter types (or the type never if Type is not a function).
 */
/**
 * ReturnType<Type>
 * Constructs a type consisting of the return type of function Type.
 */
/**
 * InstanceType<Type>
 * Constructs a type consisting of the instance type of a constructor function in Type.
 */

type Name = {
    first: string;
    last: string;
}

function addFullName(name: Name): Name & { fullName: string } {
    return {
        ...name,
        fullName: `${name.first} ${name.last}`
    }
}

function permuteRows<T extends (...args: any[]) => any>(
    iteratorFunction: T,
    data: Parameters<T>[0][])
    : ReturnType<T>[] {
    return data.map(iteratorFunction)
}

console.log(permuteRows(addFullName, [{ first: "Denis", last: "Molloy" }])) //[ { first: 'Denis', last: 'Molloy', fullName: 'Denis Molloy' } ]

class PersonWithFullName {
    constructor(public name: Name) { }

    get fullName() {
        return `${this.name.first} ${this.name.last}`
    }
}

function createObjects<T extends new (...args: any[]) => any>(ObjectType: T, data: ConstructorParameters<T>[0][])
    : InstanceType<T>[] {
    return data.map(item => new ObjectType(item))
}

console.log(createObjects(PersonWithFullName, [{ first: "Jack", last: "Herrington" }])) //[ PersonWithFullName { name: { first: 'Jack', last: 'Herrington' } } ]