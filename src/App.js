import { useState, useEffect } from "react";
import { getAllPokemon, getPokemon } from "./utils/pokemon"
import Card from "./components/Card/Card"
import Navbar from "./components/Navbar/Navbar"
import './App.css';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得する
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous);
      console.log(res);
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

  // console.log(pokemonData);

  const handlePrevPage =  async () => {
    if (!prevURL) return;
    console.log("handlePrevPage")
    setLoading(true);
    let res = await getAllPokemon(prevURL);
    console.log(res);
    await loadPokemon(res.results);
    setNextURL(res.next);
    setPrevURL(res.previous);
    setLoading(false);
  };

  const handleNextPage = async () => {
    setLoading(true);
    
    let res = await getAllPokemon(nextURL);
    console.log(res);
    await loadPokemon(res.results);
    setNextURL(res.next);
    setPrevURL(res.previous);
    setLoading(false);
  };

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
        <div className="btn">
          <button onClick={handlePrevPage}>前へ</button>
          <button onClick={handleNextPage}>次へ</button>
        </div>
      </div>
    </>
  );
}

export default App;
