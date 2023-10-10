const pokeAPI = {}
 
function convertPokeAPItoModel(pokeDetail) {
    const pokemon = new Pokemon()

    pokemon.order = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name) 
    const [type] = types 

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.height = convertHeightWeightToDecimal(pokeDetail.height);
    pokemon.weight = convertHeightWeightToDecimal(pokeDetail.weight);

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    pokemon.abilities = abilities

    pokemon.HP = pokeDetail.stats[0].base_stat
    pokemon.Attack = pokeDetail.stats[1].base_stat
    pokemon.Defense = pokeDetail.stats[2].base_stat
    pokemon.Speed = pokeDetail.stats[5].base_stat

    return pokemon
}

function convertHeightWeightToDecimal(number) {
    return number = number / 10;
}

function convertPB(number) {
    return (number * (85 / 100)) / 1
}

pokeAPI.getPokemonDetail = function (pokemon) {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeAPItoModel)
}

pokeAPI.getPokemons = function (offset = 0, limit = 5) {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeAPI.getPokemonDetail) )
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonDetails) => (pokemonDetails))
}


