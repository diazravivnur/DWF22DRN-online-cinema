import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API } from "../../config/api";

import FormModal from "../Modal/Modal";
import BuyModal from "../Modal/Buy";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import youtubeGetID from "../../utils/youtube";
function DetailFIlm() {
  const params = useParams();
  const { id } = params;

  const [showBuy, setShowBuy] = useState(false);

  const handleShowBuy = () => setShowBuy(true);
  const handleCloseBuy = () => setShowBuy(false);

  const router = useHistory();

  const [film, setFilm] = useState();

  const loadFilm = async () => {
    try {
      const response = await API.get(`/films/${id}`);
      setFilm(response.data.data.film);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadFilm();
  }, []);

  const image_url = `http://localhost:5000/uploads/${film?.thumbnail}`;
  console.log(film);
  return (
    <>
      <FormModal show={showBuy} handleClose={handleCloseBuy}>
        <BuyModal
          title={film?.tittle}
          price={film?.price}
          show={showBuy}
          handleClose={() => setShowBuy(false)}
        ></BuyModal>
      </FormModal>
      <div className="film-container">
        <div className="film-content">
          <img src={image_url} className="detail-film-image"></img>
        </div>
        <div className="detail-content">
          <div className="title-buy">
            <h3>{film?.tittle}</h3>

            <button className="hero-link" onClick={handleShowBuy}>
              Buy Now
            </button>
          </div>
          {/* Videos goes here */}
          {film?.filmURL && (
            <div>
              <LiteYouTubeEmbed
                id={youtubeGetID(film.filmURL)}
                title="What’s new in Material Design for the web (Chrome Dev Summit 2019)"
              />
            </div>
          )}

          {/* Categories goes here */}
          {/* Price */}
          <p> Rp. {film?.price}</p>
          <p>{film?.description}</p>
        </div>
      </div>
    </>
  );
}

export default DetailFIlm;
