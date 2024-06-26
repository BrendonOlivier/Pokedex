const pokemonName = document.querySelector('.poke-name') // Variavel do span nome do pokemon
const pokemonNumber = document.querySelector('.poke-number')  // Variavel do span numero do pokemon
const pokemonImage = document.querySelector('.pokemon-img')  // Variavel da imagem do nosso pokemon

const form = document.querySelector('.formulario')  // Variavel do nosso formulario
const input = document.querySelector('.input-search')  // Variavel do nosso input
const buttonPrev = document.querySelector('.btn-prev')  // Variavel do botão de voltar
const buttonNext = document.querySelector('.btn-next') // Variavel do botão de avançar

let searchPokemon = 1

const fetchPokemon = async (pokemon) => {
    const responseAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if (responseAPI.status === 200) {
        const data = await responseAPI.json()
        return data
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Carregando...'
    pokemonNumber.innerHTML = ''
    const data = await fetchPokemon(pokemon)
    if (data) {
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImage.src = data['sprites']['other']['official-artwork']['front_default']
        input.value = ''
        searchPokemon = data.id
    } else{
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Não encosearchPokemonntrado';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
})

buttonPrev.addEventListener('click', () => {
    if(searchPokemon > 1) {
        searchPokemon -= 1

        renderPokemon(searchPokemon)
    }
})

buttonNext.addEventListener('click', () => {
    searchPokemon += 1

    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)