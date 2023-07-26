import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPokemonPage = createAsyncThunk(
    'pokemon/fetchPokemonPage',
    async ({ page }) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${(page-1)*3}&limit=3`);
      const data = await response.json();
      
      const promises = data.results.map(async pokemon => {
        const pokemonResponse = await fetch(pokemon.url);
        const pokemonData = await pokemonResponse.json();
        return {...pokemon, image: pokemonData.sprites.front_default};
      });
      const resultsWithImage = await Promise.all(promises);
      
      return {list: resultsWithImage, page};
    }
  );
  

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: { list: [], page: 1, status: 'idle', error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPokemonPage.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPokemonPage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.list;
        state.page = action.payload.page;
      })
      .addCase(fetchPokemonPage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
});

export default pokemonSlice.reducer;
