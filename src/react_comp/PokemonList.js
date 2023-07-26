import React from 'react';
import { useSelector } from 'react-redux';

export default function PokemonList() {
    const pokemonList = useSelector(state => state.pokemon.list);
    const status = useSelector(state => state.pokemon.status);
    
    if (status === 'loading') {
      return <div>Loading...</div>;
    }
    
    if (status === 'failed') {
      return <div>Error loading Pokemon</div>;
    }
  
    return (
      <div>
        {pokemonList.map(pokemon => (
          <div key={pokemon.name}>
            <img src={pokemon.image} alt={pokemon.name}/>
            {pokemon.name}
          </div>
        ))}
      </div>
    );
  }
  