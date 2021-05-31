import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import { API } from "../../config/api";

function Hero() {
  const [state] = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const router = useHistory();
  const [film, setFilm] = useState([]);

  const loadFilm = async () => {
    try {
      const response = await API.get(`/films/${id}`);
      setFilm(response.data.data.film);
    } catch (error) {
      console.log(error);
    }
  };
  const { id, thumbnail } = film;

  const goToPage = () => {
    router.push(`/films/${20}`);
  };

  return (
    <div>
      <div className="hero-container">
        <div className="hero">
          <div className="hero-content">
            <h3>Deadpool</h3>
            <p>
              Deadpool adalah sebuah film pahlawan super Amerika yang
              berdasarkan pada karakter Marvel Comics dengan nama yang sama.
              Film tersebut merupakan instalmen kedelapan dalam serial film
              X-Men
            </p>
            {!state.isLogin ? (
              <>
                <div className="hero-link" onClick={goToPage}>
                  Buy Now
                </div>
              </>
            ) : (
              <div
                className="hero-link"
                onClick={() => router.push("/film/:id")}
              >
                Buy Now
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="hero-content">
        <h3>List Film</h3>
      </div>
    </div>
  );
}

export default Hero;
