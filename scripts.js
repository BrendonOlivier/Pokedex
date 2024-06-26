const pokeContainer = document.querySelector('.pokeContainer')
const btnCarregarMais = document.getElementById('btn-mais')

let pokemonData = [];   // Um array pra guardar os pokemons
let offset = 0          
let limit = 20

const colors = {            // Colocando as devidas cores para o tipo do pokemon
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}

// Variavel dos TIPOS dos pokemons
const mainTypes = Object.keys(colors);

// Função que já mostra os primeiros 20 pokemons
const fetchPokemons = async () => {
    // Inicialmente carregar os primeiros 20 Pokémon
    for (let i = 1; i <= limit; i++) {
        await getPokemons(i);
    }
}

// Fazendo a busca da API
const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const response = await fetch(url)
    const data = await response.json()

    pokemonData.push(data)
    createPokemonCard(data)
}

// Função pra mostrar os próximos 20 pokemons
const mostrarMaisPokes = async () => {
    offset += limit; // Incrementar o offset para os próximos Pokémon
    for (let i = offset + 1; i <= offset + limit; i++) {
        await getPokemons(i);
    }
}

// Função pra criar os cards arrumando certo as cores, nomes e tipos :
const createPokemonCard = (poke) => {
    const card = document.createElement('div')
    card.classList.add('pokemon')

    const name = poke.name[0].toUpperCase() + poke.name.slice(1)
    const id = poke.id.toString().padStart(4, '0')

    const pokeTypes = poke.types.map(type => type.type.name)
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1)
    const color = colors[type]

    card.style.backgroundColor = color

    const pokemonHTML =
        `
        <div class="imgContainer">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
        </div>

        <div class="info">
            <span class="number">#${id}</span>
            <h1 class="name">${name}</h1>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `

    card.innerHTML = pokemonHTML

    pokeContainer.appendChild(card)

}

// Adicionando o alerta de click no botão de carregar mais
btnCarregarMais.addEventListener('click', mostrarMaisPokes);

fetchPokemons()