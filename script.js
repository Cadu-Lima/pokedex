const pokemonName = document.querySelector('.pokemonName');
const pokemonId = document.querySelector('.pokemonId');

const fetchPokemon = async (pokemon) => 
{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await APIResponse.json();
    return data;
}


const renderPokemon = async (pokemon) =>
{

    const data = await fetchPokemon(pokemon);

    pokemonName.innerHTML = data.name;
    pokemonId.innerHTML = data.id;

}

renderPokemon('Pichu');