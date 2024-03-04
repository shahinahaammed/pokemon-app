import { useEffect, useState } from "react";
import "./App.css";
import PokemonList from "./components/PokemonList";
import axios from "axios";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setcurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon") ;
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPagePageUrl, setPrevPageUrl] = useState()
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios.get(currentPageUrl).then((res) => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map((p) => p.name));
    });
  }, [currentPageUrl]);

  if( loading) return "Loading..."

  return (
    <div>
      <PokemonList pokemon={pokemon} />
    </div>
  );
}

export default App;
