import react, { useEffect, useRef, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import axios from "./../../../assets/axios/axios";
import ResultItem from "./ResultItem/ResultItem";

import { AiOutlineCloseCircle } from "react-icons/ai";

import "./SearchBarResultsStyles.scss";

const SearchBarResults = ({
  setShowSearchBarResults,
  value,
  setSearchInput,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  // let searchBarInput = value;
  // console.log(value, "acasa");
  const [articleTitle, setArticleTitle] = useState("");
  const [articleDescription, setArticleDescription] = useState("");
  const [searchBarResultsArticles, setSearchBarResultsArticles] = useState([]);

  const navigate = useNavigate();
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
        setSearchBarResultsArticles([...response.data.articles]);
        console.log([...response.data.articles]);
        // console.log(searchBarResultsArticles);
        // console.log(response.data.articles);
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
        setSearchInput("");
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

  const openPost = () => {};

  return (
    <div className="results" ref={searchBarResultsRef}>
      <div className="results__top-section">
        <div className="results__top-section__text">Rezultatele Căutării</div>
        {desktopDisplay && (
          <AiOutlineCloseCircle
            className="results__top-section__close"
            onClick={() => {
              setShowSearchBarResults(false);
            }}
          />
        )}
      </div>
      <div className="results__main-section">
        {/* {console.lo} */}
        {searchBarResultsArticles.map((a) => {
          return (<ResultItem article={a}/>)
        })}
      </div>
    </div>
  );
};

export default SearchBarResults;
