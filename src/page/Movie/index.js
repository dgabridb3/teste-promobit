import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import "./index.css";
import axios from "axios";
import { CardMovie } from "../../components/CardMovie";

export const Movies = () => {
  const [arrayMovies, setArrayMovies] = useState();
  const URLIMAGE = "https://image.tmdb.org/t/p/original";
  const [list, setList] = useState()
  const [categ, SetCateg] = useState()
  
 
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=8b6a42e36c289bead9a8362659ff77dd"
      )
      .then((res) => setList(res.data));
  }, []);


  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=8b6a42e36c289bead9a8362659ff77dd&page=1"
      )
      .then((res) => setArrayMovies(res.data));
  }, []);

   const onClickCat = (category) => SetCateg(category)

  //  console.log(arrayMovies)
  //  console.log(list)
  //  console.log(categ)
  
 
  return (
    <>
      <Header />
      <section className="section-h1-filter">
        <div className="h1-filter">
          <h1>
            Milhões de filmes, séries e pessoas para descobrir. Explore já.
          </h1>
          <p>FILTRE POR:</p>
          <div>
              { list && list.genres.map((i)=>{return (
              <div className="filtros" onClick={()=> onClickCat(i.id)}>
                <p>{i.name}</p>
              </div>)})}
          </div>
        </div>
      </section>
      <section className="section-movies">
        <div className="movies">
          <CardMovie
            arrayMovies={arrayMovies && arrayMovies.results}
            URLIMAGE={URLIMAGE}
            categ={categ}
          />
        </div>
      </section>
    </>
  );
};
