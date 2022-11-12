import React from "react";
import "./index.css";

export const CardActor = (props) => {
  const elenco = props.elenco;
  const URLIMAGE = props.URLIMAGE;



  return (
    <>
      {elenco &&
        elenco.cast.map((i) => {
          return (
            <div className={"border-card-actor"}>
              <div>
                <img src={`${URLIMAGE}${i.profile_path}`} />
                <p>{i.name}</p>
                <p>{i.character}</p>
              </div>
            </div>
          );
        })}
    </>
  );
};
