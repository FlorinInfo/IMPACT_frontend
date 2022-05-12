import react from "react";
import { useNavigate } from "react-router-dom";

import "./ResultItemStyles.scss";

const ResultItem = ({ article }) => {
  console.log(article);

  let navigate = useNavigate();

  const openPost = () => {
    navigate(`/post/${article.id}`);
  };

  return (
    <div className="results__item" onClick={openPost}>
      <span className="results__item__title">{article.title}</span>
      <span className="results__item__text">{article.description}</span>
    </div>
  );
};

export default ResultItem;
