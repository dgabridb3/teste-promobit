import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { CardActor } from "../../components/CardActor";
import { CardMovie } from "../../components/CardMovie";

import "./index.css";

export const MovieDetails = () => {
  const params = useParams();

  const ULRMOVIEDETAILS = `https://api.themoviedb.org/3/movie/`;
  const CHAVEKEY = "?api_key=8b6a42e36c289bead9a8362659ff77dd";
  const URLIMAGE = "https://image.tmdb.org/t/p/original";
  const [infoMovie, SetInfoMovie] = useState({});
  const [arrayMovies, setArrayMovies] = useState();
  const [credits, setCredits] = useState();
  const [videos, setVideos] = useState();


  useEffect(() => {
    axios
      .get(`${ULRMOVIEDETAILS}${params.id}${CHAVEKEY}`)
      .then((res) => SetInfoMovie(res.data));
  }, [params.id]);

  useEffect(() => {
    axios
      .get(`${ULRMOVIEDETAILS}${params.id}$/recommendations${CHAVEKEY}`)
      .then((res) => setArrayMovies(res.data));
  }, [params.id]);
  useEffect(() => {
    axios
      .get(`${ULRMOVIEDETAILS}${params.id}$/credits${CHAVEKEY}`)
      .then((res) => setCredits(res.data));
  }, [params.id]);
  useEffect(() => {
    axios
      .get(`${ULRMOVIEDETAILS}${params.id}$/videos${CHAVEKEY}`)
      .then((res) => setVideos(res.data));
  }, [params.id]);

  const trailer =
    videos &&
    videos.results.filter((i) => {
      return i.name === "Official Trailer";
    });

  const classicacao =
    infoMovie.genres &&
    infoMovie.genres.map((i) => {
      return `${i.name} `;
    });
  const converter = (minutos) => {
    const horas = Math.floor(minutos / 60);
    const min = minutos % 60;
    const textoHoras = `${horas}`;
    const textoMinutos = `${min}`;

    return `${textoHoras}h${textoMinutos}m`;
  };

  const duracao = converter(infoMovie.runtime);
  const lancamento =
    infoMovie.release_date &&
    infoMovie.release_date.split("-").reverse().join("/");
  const anoLancamento =
    infoMovie.release_date && infoMovie.release_date.substring(0, 4);

  const newArrayMovies = arrayMovies && arrayMovies.results.slice(0, 5);
  const crew =
    credits &&
    credits.crew.slice(0, 5).map((i) => {
      return (
        <div>
          <p>{i.name}</p>
          <p>{i.job}</p>
        </div>
      );
    });

  return (
    <>
      <Header />
      <section className="section-cartaz">
        <div className={"cartaz"}>
          <img src={`${URLIMAGE}${infoMovie.poster_path}`} />
          <div className={"cartaz-info"}>
            <h2>{`${infoMovie.title} (${anoLancamento})`}</h2>
            <p>{`${lancamento} • ${classicacao} • ${duracao}`}</p>

            <h3>Sinopse</h3>
            <p>{`${infoMovie.overview}`}</p>
            <div className={"cartaz-diretor"}>{crew}</div>
          </div>
        </div>
      </section>
      <section className={"section-elenco"}>
        <h2>Elenco original</h2>

        <div className="container-elenco">
          <CardActor elenco={credits} URLIMAGE={URLIMAGE} />
        </div>
      </section>
      <section className={"section-trailer"}>
        <h2>Trailer</h2>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${
            (videos && videos.results.length === 0) ||
            (trailer && trailer.length === 0)
              ? ""
              : trailer && trailer[0].key
          }  `}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </section>
      <section className={"section-recomendacoes"}>
        <h2>Recomendações</h2>
        <div className="recomendacoes">
          <CardMovie arrayMovies={newArrayMovies} URLIMAGE={URLIMAGE} />
        </div>
      </section>
    </>
  );
};
