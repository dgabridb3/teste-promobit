import "./index.css";
import { useNavigate } from "react-router-dom";
import { goToMovieDetail } from "../../route/Coordinator";
import React,{useState} from "react";

export const CardMovie = (props) => {
  const filme = props.arrayMovies && props.arrayMovies;
  const URLIMAGE = props.URLIMAGE;

  const navigate = useNavigate();
  const [filteredCategoryRestaurants, setFilteredCategoryRestaurants] = useState([]);

  const filterFilter = filme && filme.filter((i)=>{
    const filterID = i.genre_ids.filter(index => index === props.categ)
    const [id] = filterID
    return id
  })
  .map((i) => {
    return (
      <div
        className={"card-movie"}
        onClick={() => goToMovieDetail(navigate, i.id)} key={i.id}
      >
        <img src={`${URLIMAGE}${i.poster_path}`} />
        <p> {i.title} </p>
        <p>{i.release_date}</p>
      </div>
    );
  })

  return (
             <>{filterFilter}</>
  );
};
