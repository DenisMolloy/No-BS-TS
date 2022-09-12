/**
 * VIDEO #8 - Generics in TS
 */

/**
 * Making a function generic 
 */

// ORIGINAL
// function simpleStringState(
//     initial: string
//     ): [() => string, (v: string) => void] {
//     // note str is a closure
//     let str: string = initial;
//     return [
//         () => str,
//         (v: string) => { str = v }
//     ]
// }

// specifiying that there is a type I'm referring to as T
// T will be replaced by whatever is passed as an arg to the initial state
function simpleState<T>(
    initial: T
): [() => T, (v: T) => void] {
    // note str is a closure
    let val: T = initial;
    return [
        () => val,
        (v: T) => { val = v }
    ]
}

const [st1Getter, st1Setter] = simpleState(9)
console.log(st1Getter())
st1Setter(100)
console.log(st1Getter())

/**
 * Overriding inferred Generic Types
 */
//  const [st2Getter,st2Setter] = simpleState(null) //this changes all Ts in simpleState to a type of null
const [st2Getter, st2Setter] = simpleState<string | null>(null) //this changes all Ts in simpleState to a type of null
console.log(st2Getter()) //null
//  st2Setter("str") //Error (prior to adding Generic Override) - Argument of type '"str"' is not assignable to parameter of type 'null'.
st2Setter("str")
console.log(st2Getter())



/**
 * Example 2 - Ranker
 */

// 2 - Afer moving the interface outside of ranker, RankItem throws an error: Cannot find name 'RankItem'
//  interface Rank{
//     item: RankItem
//     rank: number;
// }

interface Rank<RankItem> {
    item: RankItem
    rank: number;
}

function ranker<RankItem>(items: RankItem[], rank: (v: RankItem) => number): RankItem[] {
    // 1 - interface is created inside function so RankItem is available
    // interface Rank{
    //     item: RankItem;
    //     rank: number;
    // }

    // 3 - Rank[] error - Generic type 'Rank<RankItem>' requires 1 type argument(s). 
    // const ranks:Rank[] = items.map(item => ({
    //     item,
    //     rank: rank(item)
    // }))

    // 4 - Pass Rank an argument of <RankItem> to get around error in 3
    const ranks: Rank<RankItem>[] = items.map(item => ({
        item,
        rank: rank(item)
    }))
    ranks.sort((a, b) => a.rank - b.rank)
    return ranks.map(rank => rank.item)
}

interface Pokemon {
    name: string;
    hp: number;
}

const pokemon : Pokemon[] = [
    {
        name:"Bulbasaur",
        hp:30
    },
    {
        name:"Pikachu",
        hp:20
    },
    {
        name:"Charmander",
        hp:25
    },
]

const ranks = ranker(pokemon, ({hp})=>hp)
console.log(ranks)
// [
//   { name: 'Pikachu', hp: 20 },
//   { name: 'Charmander', hp: 25 },
//   { name: 'Bulbasaur', hp: 30 }
// ]