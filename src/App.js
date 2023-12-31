import { useState, useEffect } from "react";
import { getAllPokemon, getPokemon } from "./utils/pokemon"
import Card from "./components/Card/Card"
import Navbar from "./components/Navbar/Navbar"
import './App.css';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得する
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      // console.log(res.results);
      setLoading(false);
    }
    fetchPokemonData();
  },[]);

  const loadPokemon = async (data) => {
    // _pokemonDataにreturnされたpokmeonRecordが入る
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // console.log(pokemon);
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    )
    setPokemonData(_pokemonData);
  }

  console.log(pokemonData);

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中・・・</h1>
        ):
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />
            })}
          </div>  
        }
      </div>
    </>
  );
}

export default App;
