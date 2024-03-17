import React, { useState, useEffect } from 'react';
// import { DrawerComponent } from './component/DrawerComponent';

const PokeDex: React.FC = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemon, setPokemon] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // Adjust fetchPokemon to optionally accept a pokemon name
  const fetchPokemon = async (name?: string) => {
    const pokemonToFetch = name || pokemonName;
    if (!pokemonToFetch) return;
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonToFetch.toLowerCase()}`);
      const data = await response.json();
      const number = data.id;

      const mainImgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`;

      const simplifiedData = {
        name: data.name,
        number: data.id,
        image: mainImgSrc,
        types: data.types.map((t: any) => t.type.name),
        abilities: data.abilities.map((a: any) => a.ability.name),
        moves: data.moves.map((m: any) => m.move.name).slice(0, 10),
      };

      setPokemon(simplifiedData);
      updateFavoriteStatus(simplifiedData.name);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setPokemon(null);
    }
  };

  // useEffect to fetch Chesnaught on component mount
  useEffect(() => {
    fetchPokemon('chesnaught');
  }, []);

  const updateFavoriteStatus = (name: string) => {
    const favorites = JSON.parse(localStorage.getItem('Favorites') || '[]');
    setIsFavorite(favorites.includes(name));
  };

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('Favorites') || '[]');
    if (pokemon && favorites.includes(pokemon.name)) {
      favorites = favorites.filter((name: string) => name !== pokemon.name);
      setIsFavorite(false);
    } else if (pokemon) {
      favorites.push(pokemon.name);
      setIsFavorite(true);
    }
    localStorage.setItem('Favorites', JSON.stringify(favorites));
  };

  return (
    
  <div className="min-h-screen p-9 flex flex-col items-center text-white">
    {/* <DrawerComponent/> */}
    <h1 className="text-7xl mb-8 font-bold mt-10">PokeRealm</h1>
    <div className="grid md:grid-cols-10">
      <div className="flex flex-col col-span-4">
        <div className='flex text-lg'>          
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
            placeholder="Enter Pokemon Name"
          />
          <button
            onClick={() => fetchPokemon(pokemonName)}
            className="px-4 py-2 text-lg font-medium text-gray-900 bg-white border-t border-b border-gray-200 rounded-s-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white" data-drawer-target="drawer-navigation" data-drawer-show="drawer-navigation"
            aria-controls="drawer-navigation">
            Search
            </button>
            {/* <DrawerComponent/> */}
            
          {pokemon && (
            <button onClick={toggleFavorite} className={` ${isFavorite ? 'bg-red-500' : 'bg-gray-700'} px-4 py-2 text-sm font-medium  rounded-e-lg  focus:z-10 focus:ring-2     dark:text-white  dark:focus:ring-blue-500 dark:focus:text-white"
            data-drawer-target="drawer-navigation" data-drawer-show="drawer-navigation`}>
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          )}
          </div>
          

          {/* <!-- drawer component --> */}
    {/* <div id="drawer-navigation"
      className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-64 dark:bg-gray-800"
      aria-labelledby="drawer-navigation-label">
      <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
        Favorites</h5>
      <button type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
        <span className="sr-only">Close menu</span>
      </button>
      <div className="py-4 overflow-y-auto">
        <ul id="favsTxtList" className="space-y-2 font-medium">
          <li>
            <a href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <span  className="ms-3"></span>
            </a>
          </li>
        </ul>
      </div>
    </div> */}
          
         
        {pokemon && (
            <>
              <div className='flex gap-4 justify-center'>
                 <h2 className="text-4xl font-bold">{`#${pokemon.number}`}</h2>
            <h2 className="text-4xl font-bold">{pokemon.name}</h2>
              </div>
           
            <img src={pokemon.image} alt={pokemon.name} className="mt-5" style={{ minWidth: '300px', minHeight: '300px' }} />
          </>
        )}
        </div>
        <div className="flex flex-col col-span-4 ml-10">
       
          
        {/* Pokémon Details */}
        {pokemon && (
          <div>
            <p>Types: {pokemon.types.join(', ')}</p>
            <p>Abilities: {pokemon.abilities.join(', ')}</p>
            <div>Moves: {pokemon.moves.join(', ')}</div>
            </div>
            

            )}
           
      </div>
    </div>
  </div>
);

};

export default PokeDex;
