import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API } from "../../config/api";
import { UserContext } from "../../contexts/userContext";

import FormModal from "../Modal/Modal";
import BuyModal from "../Modal/Buy";
import AfterBuy from "../Modal/AfterBuy";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import youtubeGetID from "../../utils/youtube";

function DetailFIlm() {
  const [state, dispatch] = useContext(UserContext);
  const [showBuy, setShowBuy] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  const params = useParams();
  const { id } = params;

  const handleShowBuy = () => {
    dispatch({ type: "showBuyPopup" });
  };
  const handleCloseBuy = () => {
    dispatch({ type: "hideBuyPopup" });
  };

  // PopUp
  const handleShowPopUp = () => {
    dispatch({ type: "showAfterBuyPopUp" });
  };
  const handleClosePopUp = () => {
    dispatch({ type: "hideAfterBuyPopUp" });
  };
  const toggleToPopUp = () => {
    setShowPopUp(true);
    dispatch({ type: "hideAfterBuyPopUp" });
  };

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
    loadFilm();
    loadOwnedFilms();
  }, []);

  const image_url = `http://localhost:5000/uploads/${film?.thumbnail}`;
  console.log(film);
  console.log(films);
  return (
    <>
      <FormModal show={state.showBuyPopup} handleClose={handleCloseBuy}>
        <BuyModal
          category={film?.category.name}
          filmid={film?.id}
          title={film?.tittle}
          price={film?.price}
          show={state.showBuyPopup}
          handleClose={handleCloseBuy}
        ></BuyModal>
        <AfterBuy
          show={handleShowPopUp}
          handleClose={handleClosePopUp}
        ></AfterBuy>
      </FormModal>
      <div className="film-container">
        <div className="film-content">
          <img src={image_url} className="detail-film-image"></img>
        </div>
        <div className="detail-content">
          <div className="title-buy">
            <h3>{film?.tittle}</h3>
            {films.find((ownedFilm) => ownedFilm.id === film.id) ? (
              <div></div>
            ) : (
              <div>
                <button
                  className="hero-link"
                  onClick={() => {
                    handleShowBuy();
                  }}
                >
                  Buy Now
                </button>
                {/* <ModalBuy open={state.isBuy} onClose={handleCloseBuy} loadFilm={film}></ModalBuy>
                                    <PopUp open={state.isPopUp} onPopClose={handleClosePopUp}></PopUp> */}
              </div>
            )}
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
          <h4>{film?.category.name}</h4>
          {/* Price */}
          <h5> Rp. {film?.price}</h5>
          <p>{film?.description}</p>
        </div>
      </div>
    </>
  );
}

export default DetailFIlm;
