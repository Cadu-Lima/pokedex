const pokemonName = document.querySelector('.pokemonName');
const pokemonId = document.querySelector('.pokemonId');
const pokemonImage = document.querySelector('.pokemonImage');
const form = document.querySelector('.input');
const input = document.querySelector('#searchInput');
const pokemonType = document.querySelector('.pokemonType'); 
const pokemonType2 = document.querySelector('.pokemonType2');
const colorCard = document.querySelector('.background');
const hp = document.querySelector ('.hp');
const attack = document.querySelector ('.attack');
const defense = document.querySelector ('.defense');
const specialatk = document.querySelector ('.specialatk');
const specialdef = document.querySelector ('.specialdef');
const speed = document.querySelector ('.speed');
const prevbtn = document.querySelector('.prevbtn');
const nextbtn = document.querySelector('.nextbtn');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => 
{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
    if (APIResponse.status == 200)
    {
        const data = await APIResponse.json();
        console.log(data);
        return data;
    }

}


const renderPokemon = async (pokemon) =>
{
    pokemonName.innerHTML = "Loading...";
    pokemonId.innerHTML = '';
    
    const data = await fetchPokemon(pokemon);

    if(data && data.id < 1026)
    {
        pokemonImage.style.display = 'inline';
        searchPokemon = data.id;
        pokemonName.innerHTML = data.name[0].toUpperCase() + data.name.slice(1);
        pokemonId.innerHTML = `#${data.id}`;

        if (data.id < 650)
        {
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        }
        else
        {

            pokemonImage.src = data['sprites']['front_default'];
        }
        

        const types = data.types;
        pokemonType.innerHTML = types[0]?.type.name || "undefined"; 
        pokemonType2.innerHTML = types[1]?.type.name || "none"; 

        colorCard.style.backgroundColor = getBackgroundColor(types[0]?.type.name);
        pokemonType.style.backgroundColor = getBackgroundColor(types[0]?.type.name);

        if (types[1]) {
            pokemonType2.style.backgroundColor = getBackgroundColor(types[1]?.type.name);
        }
        else
        {
            pokemonType2.style.backgroundColor = "#D3D3D3";

        }

        data.stats.forEach(stat => {
            switch (stat.stat.name) {
                case "hp":
                    hp.innerHTML = stat.base_stat;
                    break;
                case "attack":
                    attack.innerHTML = stat.base_stat;
                    break;
                case "defense":
                    defense.innerHTML = stat.base_stat;
                    break;
                case "special-attack":
                    specialatk.innerHTML = stat.base_stat;
                    break;
                case "special-defense":
                    specialdef.innerHTML = stat.base_stat;
                    break;
                case "speed":
                    speed.innerHTML = stat.base_stat;
                    break;
            }
        });
        input.value = '';
    }
    else 
    {
        pokemonName.innerHTML = "Não encontrado";
        pokemonId.innerHTML = "";
        pokemonImage.style.display = 'none';
        pokemonType.innerHTML = null;
        pokemonType2.innerHTML = null;
        hp.innerHTML = '';
        attack.innerHTML = '';
        defense.innerHTML = '';
        specialatk.innerHTML = '';
        specialdef.innerHTML = '';
        speed.innerHTML = '';
    }

    input.value= ''
}

function searchPokemons(){
    renderPokemon(input.value);
}

input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        renderPokemon(input.value);
    }
});

const getBackgroundColor = (type) => {
    switch (type) {
        case "fire":
            return "#FFA500";FFA500
        case "water":
            return "#33B5FF";
        case "grass":
            return "#75B900";
        case "electric":
            return "#FFEE33";
        case "bug":
            return "#8FBC8F";
        case "poison":
            return "#800080";
        case "ghost":
            return "#9B30FF";
        case "psychic":
            return "#FF1493";
        case "dragon":
            return "#00BFFF";
        case "normal":
            return "#A9A9A9";
        case "fighting":
            return "#FF5733";
        case "flying":
            return "#B0E0E6";
        case "rock":
            return "#8B4513";
        case "steel":
            return "#C0C0C0";
        case "ice":
            return "#00FFFF";
        case "fairy":
            return "#FFC0CB";
        case "dark":
            return "#2F4F4F";
        case "ground":
            return "#D2B48C";
        case "unknown":
            return "#F0F0F0";
        default:
            return "#A9A9A9";
    }
};

function previousPage()
{
    if (searchPokemon > 1)
    {
        searchPokemon -= 1
        renderPokemon(searchPokemon.toString());
    }
};
function nextPage()
{
    searchPokemon += 1;
    renderPokemon(searchPokemon.toString());
};


renderPokemon('1');