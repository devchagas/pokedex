const showDetail = document.getElementById('pokeDetails');
const endPoint = "https://pokeapi.co/api/v2/pokemon/";

function showPokemonDetails(pokemon) {
    console.log(pokemon)

    showDetail.innerHTML =
    `
    <div class="metadata ${pokemon.type}">
        <div class="title">
            <h1>${pokemon.name}</h1>

            <button class="${pokemon.type}" id="back" type="button" onClick="redirectHome()">
                <img src="assets/images/pokemon-icon.webp">
            </button>
        </div>

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
            <div class="about">
            <h4>About</h4>

            <span class="species">Species: ${pokemon.type}</span>
            <span class="height">Height: ${pokemon.height} m</span>
            <span class="weight">Weight: ${pokemon.weight} kg</span>
            <h5>Abilities</h5>
            <ol class="abilities">
                ${pokemon.abilities.map((ability) => `<li class="ability ${pokemon.type}">${ability}</li>`).join('')}
            </ol>
            </div>
            <div class="stats">
                <h4>Stats</h4>

                <div class="HP">
                    <span>HP</span>
                    <div class="pb">
                        <div class="fpb ${pokemon.type}" style="width: ${pokemon.HP}%; display: block;
                        border-radius: 1rem; justify-content: right; text-align: center">${pokemon.HP}</div>
                    </div>
                </div>
                
                <div class="Attack">
                <span>Attack</span>
                <div class="pb">
                    <div class="fpb ${pokemon.type}" style="width: ${pokemon.Attack}%; display: block;
                    border-radius: 1rem; justify-content: right; text-align: center">${pokemon.Attack}</div>
                </div>
                </div>

                <div class="Defense">
                <span>Defense</span>
                <div class="pb">
                    <div class="fpb ${pokemon.type}" style="width: ${pokemon.Defense}%; display: block;
                    border-radius: 1rem; justify-content: right; text-align: center">${pokemon.Defense}</div>
                </div>
                </div>
            
                <div class="Speed">
                <span>Speed</span>
                <div class="pb">
                    <div class="fpb ${pokemon.type}" style="width: ${pokemon.Speed}%; display: block;
                    border-radius: 1rem; justify-content: right; text-align: center">${pokemon.Speed}</div>
                </div>
                </div>

            </div>
    </div>
    
    `
   
}


fetch(endPoint + new URLSearchParams(location.search).get('id'))
    .then((response) => response.json())
    .then(data => convertPokeAPItoModel(data))
    .then(pokemon => showPokemonDetails(pokemon))

function redirectHome() {
    window.open('index.html', '_self');
}    
    
   






