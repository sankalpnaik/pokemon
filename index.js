const app = document.createElement('div')
document.body.appendChild(app);


const baseURL = "https://pokeapi.co/api/v2/pokemon/"

const loading = document.createElement('p');
loading.innerText = "Loading..."
loading.classList.add('loading')
let currentPokemonId = 1; 

async function rerenderPokemon(){
    const pokeElement = document.getElementById('pokemonContainer')
    pokeElement.remove()
    app.appendChild(loading)
    const currentPokemon = await getPokemon()
    loading.remove()
    app.appendChild(createPokemon(currentPokemon))
} 

async function getPokemon(){
    const response = await fetch(`${baseURL}${currentPokemonId}`);
    const pokemon = await response.json();
    console.log(pokemon)
    return pokemon;
}

function goPreviuos()
{
    if (currentPokemonId <= 1) return;
    currentPokemonId -= 1;
    rerenderPokemon()
}


function goNext()
{
    if (currentPokemonId >= 893) return;
    currentPokemonId += 1;
    rerenderPokemon()
}

function createPokemon(pokemon){
    const pokemonElement = document.createElement('div')
    pokemonElement.id = "pokemonContainer"
    pokemonElement.classList.add("pokemon-container")

    const pokemonImage = document.createElement('img')
    pokemonImage.src = pokemon.sprites?.other?.dream_world?.front_default ||
                        pokemon.sprites?.other?.["official-artwork"]?.front_default ||
                        pokemon.sprites?.front_default;
    pokemonImage.classList.add('pokemon-image')
    pokemonElement.appendChild(pokemonImage)

    const pokemonInfo = document.createElement('div')
    pokemonElement.appendChild(pokemonInfo)

    const pokemonId = document.createElement('p')
    pokemonId.id = 'pokemon-id'
    pokemonId.classList.add('pokemon-id')
    pokemonId.innerText = pokemon.id
    pokemonInfo.appendChild(pokemonId)

    const pokemonName = document.createElement('p')
    pokemonName.id = 'pokemon-name'
    pokemonName.classList.add('pokemon-name')
    pokemonName.innerText = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    pokemonInfo.appendChild(pokemonName)

    const pokemonTypes = document.createElement('div')
    pokemonTypes.classList.add('pokemon-types')

    pokemon.types.forEach(type => {
        const pokemonType = document.createElement('div')
        pokemonType.classList.add(type.type.name)
        pokemonType.innerText = type.type.name
        pokemonTypes.appendChild(pokemonType)
    });

    pokemonElement.appendChild(pokemonTypes)
    const buttons = createButtons()
    pokemonElement.appendChild(buttons)

    return pokemonElement
}

function createButtons(){
    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('button-container')

    const prevButton = document.createElement('button')
    prevButton.classList.add('button-class')
    prevButton.id = 'prev-button'
    prevButton.innerText = 'Previous'
    buttonContainer.appendChild(prevButton)

    const nextButton = document.createElement('button')
    nextButton.classList.add('button-class')
    nextButton.id = 'next-button'
    nextButton.innerText = 'Next'
    buttonContainer.appendChild(nextButton)

    nextButton.addEventListener('click',goNext)
    prevButton.addEventListener('click',goPreviuos)

    return buttonContainer
}

async function init(){
    app.appendChild(loading)
    const pokemon = await getPokemon(1)
    loading.remove();
    app.appendChild(createPokemon(pokemon))
}

init();
