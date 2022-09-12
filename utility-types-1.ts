/**
 * VIDEO #11 - Generics with keyof in TS
 */
//  https://www.typescriptlang.org/docs/handbook/utility-types.html
//  TypeScript provides several utility types to facilitate common type transformations. These utilities are available globally.

// interface MyUser {
//     name: string;
//     id: string;
//     email?: string;
// }
// interface MyUserOptionals {
//     name?: string;
//     id?: string;
//     email?: string;
// }

// // overrides - an object that has all optional fields that can be used to override the values in the initial MyUser
// const merge = (user: MyUser, overrides: MyUserOptionals): MyUser => {
//     return {
//         ...user,
//         ...overrides
//     }
// }

// console.log(merge(
//     { name: "denis", id: "foo", email: "test@yahoo.com" },
//     { email: "denis@test.gov" }
// ))
// // { name: 'denis', id: 'foo', email: 'denis@test.gov' }

/**
 * Partial utility type
 * The problem with the initial implementation is that if we add fields to MyUser, those changes won't be reflected in MyUserOptionals. How do we get the optionals to be made on the fly? the Partial<Type>
 * Partial<Type> - Constructs a type with all properties of Type set to optional. This utility will return a type that represents all subsets of a given type.
 */
interface MyUser {
    name: string;
    id: string;
    email?: string;
    phone?: string;
}

// now when hovering over MyUserOptionals & CMD+K+I, all fields are shown as optional
// and anytime MyUser changes, MyUserOptionals will automatically reflect the changes
type MyUserOptionals = Partial<MyUser>
const merge = (user: MyUser, overrides: MyUserOptionals): MyUser => {
    return {
        ...user,
        ...overrides
    }
}

console.log(merge(
    { name: "denis", id: "foo", email: "test@yahoo.com" },
    { email: "denis@test.gov" }
))
// { name: 'denis', id: 'foo', email: 'denis@test.gov' }


/**
 * Required 
 * Required<Type>
 * Constructs a type consisting of all properties of Type set to required. The opposite of Partial.
 */
// Now all optional fields of MyUser are required
type RequiredMyUser = Required<MyUser>;

/**
 * Pick
 * Pick<Type, Keys>
 * Constructs a type by picking the set of properties Keys (string literal or union of string literals) from Type.
 */
type JustEmailAndName = Pick<MyUser, "email" | "name">

/**
 * Omit <Type, Keys>
 * Constructs a type by picking all properties from Type and then removing Keys (string literal or union of string literals).
 * ----The Opposite of Pick-----
 */

 type UserWithoutID = Omit<MyUser, "id">
 // (on hover) type UserWithoutID = {
 //     name: string;
 //     email?: string | undefined;
 //     phone?: string | undefined;
 // })


/**
 * RECORD (i.e. map)
 * Record<Keys, Type>
 * Constructs an object type whose property keys are Keys and whose property values are Type. This utility can be used to map the properties of a type to another type.
 */

// "id" is a string
// The output is MyUser

// MyUser["id"] == Type from field
const mapById = (users: MyUser[]): Record<MyUser["id"], MyUser> =>{
// const mapById = (users: MyUser[]): Record<string, MyUser> =>{
    // a the accumulator/object being returned
    // v the user record
    return users.reduce((a, v) => {
        return {
            ...a,
            // the users id will be the key used to point to that user
            [v.id]: v
        }
    }, {})
}

console.log(mapById([
    {
        id: "foo",
        name: "Mr. Foo"
    },
    {
        id: "bar",
        name: "Ms. Bar"
    }
]))
// {
//     foo: { id: 'foo', name: 'Mr. Foo' },
//     bar: { id: 'bar', name: 'Ms. Bar' }
// }



