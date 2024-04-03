import React from 'react';

const RecipeDetails = ({ type, recipe }) => {
    const {
        strMealThumb,
        strInstructions,
        strMeal,
        strCategory,
        strYoutube,
        strDrinkThumb,
        strDrink
    } = type === 'meals' ? recipe : recipe;



    return (
        <div className={`recipe-details ${type === 'meals' ? 'meal-details' : 'cocktail-details'}`}>
            <div className="recipe-details-content">
                <div className="left">
                    <img src={strMealThumb || strDrinkThumb} alt={strMeal || strDrink} className="recipe-image" />
                    <h2 className="recipe-title">{strMeal || strDrink}</h2>
                </div>
                <div className="right">
                    <p className="recipe-instructions">{strInstructions}</p>
                    <p><b>Category:</b> {strCategory}</p>
                    <p>
                        <b>YouTube Link:</b>
                        <a href={strYoutube} target="_blank" rel="noopener noreferrer">
                            {strYoutube ? 'Watch here' : 'Not available'}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;