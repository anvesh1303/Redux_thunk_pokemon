import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPokemonPage } from './redux_comp/pokemonSlice';
import PokemonList from './react_comp/PokemonList';
import { useSelector } from 'react-redux/es/hooks/useSelector';

export default function App() {
  const dispatch = useDispatch();
  const page = useSelector(state => state.pokemon.page);
  
  useEffect(() => {
    dispatch(fetchPokemonPage({ page }));
  }, [dispatch, page]);
  
  const loadNextPage = () => {
    dispatch(fetchPokemonPage({ page: page + 1 }));
  };

  const loadPrevPage = () => {
    if(page > 1){
      dispatch(fetchPokemonPage({ page: page - 1 }));
    }
  };
  
  return (
    <div>
      <PokemonList />
      <button onClick={loadPrevPage}>Prev Page</button>
      <button onClick={loadNextPage}>Next Page</button>
    </div>
  );
}

