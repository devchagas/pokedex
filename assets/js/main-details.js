const showDetail = document.getElementById('pokeDetails');
const endPoint = "https://pokeapi.co/api/v2/pokemon/";

function convertPokeAPItoModel(pokeDetail) {
    const pokemon = new Pokemon()

    pokemon.order = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name) 
    const [type] = types 

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

function showPokemonDetails(pokemon) {
    console.log(pokemon)

    showDetail.innerHTML =
    `
    <div class="metadata ${pokemon.type}">
        <h1>${pokemon.name}</h1>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
           

            <span class="number">#${pokemon.order}</span>
        </div>   
        <div class="photo">  
        <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
    </div>
    <div class="dets">
        About
    </div>
    `
   
}


fetch(endPoint + new URLSearchParams(location.search).get('id'))
    .then((response) => response.json())
    .then(data => convertPokeAPItoModel(data))
    .then(pokemon => showPokemonDetails(pokemon))
    
    
   








