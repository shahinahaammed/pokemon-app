import { useEffect, useState } from "react";
import "./App.css";
import PokemonList from "./components/PokemonList";
import Pagination from "./components/Pagination"
import axios from "axios";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setcurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon") ;
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPagePageUrl, setPrevPageUrl] = useState()
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl,{
      cancelToken: new axios.CancelToken(c=> cancel = c)
    }).then((res) => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map((p) => p.name));
    });

    return ()=>{
      cancel()
    }
  }, [currentPageUrl]);

  function gotoNextPage() {
    setcurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage(){
    setcurrentPageUrl(prevPagePageUrl)
  }


  if( loading) return "Loading..."

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination gotoNextPage={ 
        nextPageUrl ? gotoNextPage: null }
      gotoPrevPage={prevPagePageUrl ? gotoPrevPage : null} />
    </>
  );
}

export default App;
