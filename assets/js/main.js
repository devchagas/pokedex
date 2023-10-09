const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');


const maxRecords = 151
const limit = 10
let offset = 0

function convertPokemonDetail(pokemon) {
    return `
        <h1>${pokemon.name}</h1>
    `
}

function convertPokemonToList(pokemon) {
    return  ` 
    <li class="pokemon ${pokemon.type}">
    <span class="number">#${pokemon.order}</span>
    <span class="name">${pokemon.name}</span>
    

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>  

        <div class="showDetail">
            <button id="pokeDetails" onClick="redirect(${pokemon.order})" class="showDets ${pokemon.type}">
                <img src="assets/images/pokemon-icon.webp">
            </button>
        </div>
    </li>
`
}

function loadPokemonItems(offset, limit) {
    pokeAPI.getPokemons(offset, limit).then((pokemons = []) => {
        const newHTML = pokemons.map(convertPokemonToList).join('')
        pokemonList.innerHTML += newHTML
    })
}


loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtRecord = offset + limit

    if (qtRecord >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItems(offset, limit)
    }   
})

function redirect(id) {
    window.open('details.html?id=' + id, '_self');
}






