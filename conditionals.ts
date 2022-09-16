// /**
//  * VIDEO 21 - Conditional Types in TS
//  */

// // https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#handbook-content
import fetch from "node-fetch";
// // if TS complains about no Type Declarations for imports, run `yarn add @types/[package_name]` (needs to exist)


// // creating and interface for the results of PokeAPI https://pokeapi.co/api/v2/pokemon?limit=10


interface PokemonResults {
  count: number;
  next?: string;
  previous?: string;
  results: {
    name: string;
    url: string;
  }[];
}

type fetchURLReturn<T> = T extends undefined ? Promise<PokemonResults> : void;

function fetchPokemon<T extends undefined | ((data: PokemonResults) => void)>(
  url: string,
  cb?: T
): fetchURLReturn<T> {
  if (cb) {
    fetch(url)
      .then((data: { json: () => any; }) => data.json())
      .then((data: PokemonResults) => cb(data));
    return undefined as fetchURLReturn<T>;
  } else {
    return fetch(url).then((data: { json: () => any; }) => data.json()) as fetchURLReturn<T>;
  }
}

// fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10", (data) => {
//   data.results.forEach(({ name }) => console.log(name));
// });

(async function () {
  const data = <PokemonResults>(
    await fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10")
  );
  data.results.forEach(({ name }) => console.log(name));
})();