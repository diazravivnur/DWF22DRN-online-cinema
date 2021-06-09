import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Hero from "../Hero/Hero";
import Card from "../Card/Card";
import { API } from "../../config/api";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../../contexts/userContext";

function HomePage() {
  const router = useHistory();
  const [state] = useContext(UserContext);
  const [films, setFilms] = useState([]);
  const [category, setCategory] = useState("");
  const [filterCategory, setFilterCategory] = useState([]);

  const loadFilms = async () => {
    try {
      const response = await API.get("/films");
      setFilms(response.data.data.film);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadFilms();
  }, []);

  useEffect(() => {
    if (state.user?.id === 1) {
      router.push("/admin/translist");
    }
  }, [state.user]);

  let checkname = (name, str) => {
    var pattern = str
      .split("")
      .map((x) => {
        return `(?=.*${x})`;
      })
      .join("");
    var regex = new RegExp(`${pattern}`, "g");
    return name.match(regex);
  };
  useEffect(() => {
    setFilterCategory(
      films &&
        films.filter((categories) => {
          var searchCategory = category.toLowerCase().substring(0, 3);
          var dataCategory = categories.category.name
            .substring(0, 3)
            .toLowerCase();
          return (
            categories.category.name
              .toLowerCase()
              .includes(category.toLowerCase()) ||
            checkname(dataCategory, searchCategory)
          );
        })
    );
  }, [category, films]);
  return (
    <>
      <div className="container">
        <Hero />
        <div>
          <input
            type="text"
            placeholder="filter film here"
            classname="searchbox home-search"
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="row ">
          {/* {filterCategory && filterCategory.length > 0 ? (
            <div className="col-sm 5">
              <Card />
              data = {filterCategory}
            </div>
          ) : (
            <div>
              <h1>No Film to Display</h1>
            </div>
          )} */}
          {filterCategory?.map((film, index) => (
            <div className="col-sm 5" key={film.id + index}>
              <Card film={film} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
