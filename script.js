const pokemonName = document.querySelector('.pokemonName');
const pokemonId = document.querySelector('.pokemonId');
const pokemonImage = document.querySelector('.pokemonImage');
const form = document.querySelector('.input');
const input = document.querySelector('#searchInput');
const pokemonType = document.querySelector('.pokemonType'); 
const pokemonType2 = document.querySelector('.pokemonType2');

const fetchPokemon = async (pokemon) => 
{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
    if (APIResponse.status == 200)
    {
        const data = await APIResponse.json();
        return data;
    }

}

const typeColors = {
    grass: "#78C850",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
    normal: "#A8A878",
};


const renderPokemon = async (pokemon) =>
{
    pokemonName.innerHTML = "Loading...";
    const data = await fetchPokemon(pokemon);

    if(data)
    {
        pokemonName.innerHTML = data.name;
        pokemonId.innerHTML = `#${data.id}`;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        const types = data.types;
        pokemonType.innerHTML = types[0]?.type.name || "Tipo não encontrado"; 
        pokemonType2.innerHTML = types[1]?.type.name || "não tem"; 

        input.value = '';
    }
    else 
    {
        pokemonName.innerHTML = "Não encontrado";
        pokemonId.innerHTML = "";
        pokemonImage.src = "";
    }

    input.value= ''
}

input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        renderPokemon(input.value);
    }
});

renderPokemon('1');