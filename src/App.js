import { useState, useEffect } from "react";
import { getAllPokemon, getPokemon } from "./utils/pokemon"
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
  
  return (
    <div className="App">
      {loading ? (
        <h1>ロード中・・・</h1>
      ):
        <h1>ポケモンデータを取得しました</h1>
      }
    </div>
  );
}

export default App;
