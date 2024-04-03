import React from "react";

function SearchResults({ results, type, onSelect }) {
  return (
    <div className="data-container">
      {results.map((result) => (
        <div
          className="item"
          key={type === "meal" ? result.idMeal : result.idDrink}
          onClick={() => onSelect(type === 'meal' ? result.idMeal : result.idDrink)}
        >
          {result[type === 'meal' ? 'strMealThumb' : 'strDrinkThumb'] && (
            <img
              className="item-img"
              src={type === "meal" ? result.strMealThumb : result.strDrinkThumb}
            />
          )}
          <h3 className="result-name">
            {type === "meal" ? result.strMeal : result.strDrink}
          </h3>
          <p>
            {type === "meal" ? (
              <b>Origin : {result.strArea}</b>
            ) : (
              result.strAlcoholic
            )}
          </p>
          <p>
            <b>Category</b> : {result.strCategory}
          </p>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
