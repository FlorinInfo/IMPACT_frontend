import react from "react";

import "./ResultItemStyles.scss";

const ResultItem = ({ article }) => {
  console.log(article);
  return (
    <div className="results__item">
      <span className="results__item__title">{article.title}</span>
      <span className="results__item__text">{article.description}</span>
    </div>
  );
};

export default ResultItem;
