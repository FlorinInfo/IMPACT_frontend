import react, { useEffect, useRef, useState } from "react";
import { Cookies, useCookies } from "react-cookie";

import axios from "./../../../assets/axios/axios";

import { AiOutlineCloseCircle } from "react-icons/ai";

import "./SearchBarResultsStyles.scss";

const SearchBarResults = ({ setShowSearchBarResults, value }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  // let searchBarInput = value;
  console.log(value, "acasa");
  const [title1, setTitle1] = useState("");
  const [description1, setDescription1] = useState("");
  const [title2, setTitle2] = useState("");
  const [description2, setDescription2] = useState("");
  const [title3, setTitle3] = useState("");
  const [description3, setDescription3] = useState("");
  // console.log(props.value, "fdfdf");

  const fetchData = () => {
    axios
      .get(`/articles?q=${value}&offset=0&limit=3`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((response) => {
        // handle success
        // console.log(response.data.articles[0].title);
        setTitle1(response.data.articles[0].title.substr(0, 100));
        setTitle2(response.data.articles[1].title.substr(0, 100));
        setTitle3(response.data.articles[2].title.substr(0, 100));
        setDescription1(response.data.articles[0].description.substr(0, 100));
        setDescription2(response.data.articles[1].description.substr(0, 100));
        setDescription3(response.data.articles[2].description.substr(0, 100));
        console.log(response.data.articles);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  };

  useEffect(() => {
    fetchData();
  }, [value]);

  //click outside

  let searchBarResultsRef = useRef();

  useEffect(() => {
    let handlerClickOutside = (e) => {
      if (!searchBarResultsRef.current.contains(e.target)) {
        setShowSearchBarResults(false);
      }
    };
    document.addEventListener("mousedown", handlerClickOutside);

    return () => {
      document.removeEventListener("mousedown", handlerClickOutside);
    };
  });

  //extracting user viewwidth
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );

  let desktopDisplay = true;
  if (vw > 777) desktopDisplay = false;

  return (
    <div className="results" ref={searchBarResultsRef}>
      <div className="results__top-section">
        <div className="results__top-section__text">Rezultatele Căutării</div>
        {desktopDisplay && (
          <AiOutlineCloseCircle className="results__top-section__close" />
        )}
      </div>
      <div className="results__item">
        <span className="results__item__title">{title1}</span>
        <span className="results__item__text">{description1}</span>
      </div>
      <div className="results__item">
        <span className="results__item__title">{title2}</span>
        <span className="results__item__text">{description2}</span>
      </div>
      <div className="results__item">
        <span className="results__item__title">{title3}</span>
        <span className="results__item__text">{description3}</span>
      </div>
    </div>
  );
};

export default SearchBarResults;
