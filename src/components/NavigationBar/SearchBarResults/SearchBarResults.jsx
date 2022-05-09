import react, { useEffect } from "react";
import { Cookies, useCookies } from "react-cookie";

import axios from "./../../../assets/axios/axios";

import "./SearchBarResultsStyles.scss";

const SearchBarResults = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  let searchBarInput = "cillum";

  const fetchData = () => {
    axios
      .get(`/articles?q=${searchBarInput}&offset=0&limit=3`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((response) => {
        // handle success
        console.log(response);
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
  }, []);

  return (
    <div className="results">
      <div className="results__item">
        <span className="results__item__title">title</span>
        <span className="results__item__text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          id fermentum quam. Duis in luctus dui. Phasellus sit amet placerat
          est, et mattis nulla. Suspendisse ac tempus magna. Nam venenatis lorem
          justo
        </span>
      </div>
      <div className="results__item">
        <span className="results__item__title">title</span>
        <span className="results__item__text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          id fermentum quam. Duis in luctus dui. Phasellus sit amet placerat
          est, et mattis nulla. Suspendisse ac tempus magna. Nam venenatis lorem
          justo
        </span>
      </div>
      <div className="results__item">
        <span className="results__item__title">title</span>
        <span className="results__item__text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          id fermentum quam. Duis in luctus dui. Phasellus sit amet placerat
          est, et mattis nulla. Suspendisse ac tempus magna. Nam venenatis lorem
          justo
        </span>
      </div>
    </div>
  );
};

export default SearchBarResults;
