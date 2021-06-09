import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Card from "../Card/Card";
import { API } from "../../config/api";

function ListFilm() {
  const [films, setFilms] = useState([]);

  const loadOwnedFilms = async () => {
    try {
      const response = await API.get("/films/owned");
      setFilms(response.data.data.film);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOwnedFilms();
  }, []);

  console.log(films);
  return (
    <>
      <div className="container mt-5">
        <div className="hero-content">
          <h3>My Films</h3>
        </div>
        <div className="card ">
          <div className="card-body card-fund">
            <div className="row">
              {films &&
                films.map((film, index) => (
                  <div className="col" key={film.id + index}>
                    <Card film={film} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListFilm;
