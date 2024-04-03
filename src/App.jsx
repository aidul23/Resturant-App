import { useEffect, useState } from "react";
import "./App.css";
import RandomButton from "./components/RandomButton";
import RecipeDetails from "./components/RecipeDetails";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import useFetch from "./hooks/useFetch";

function App() {
  const [type, setType] = useState("meal");
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const mealUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  const drinkUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`;

  const {
    data: mealData,
    error: mealError,
    loading: mealLoading,
  } = useFetch(type === "meal" ? mealUrl : "");
  const {
    data: drinkData,
    error: drinkError,
    loading: drinkLoading,
  } = useFetch(type === "drink" ? drinkUrl : "");

  useEffect(() => {
    if (mealData && type === "meal") {
      setResults(mealData.meals);
    } else if (drinkData && type === "drink") {
      setResults(drinkData.drinks);
    }
  }, [mealData, drinkData, type]);

  console.log(results);

  const handleSelect = (id) => {
    const result = results.find(
      (result) => (type === "meal" ? result.idMeal : result.idDrink) === id
    );
    setSelectedRecipe(result);
  };

  const handleRandom = async () => {
    let randomUrl;
    if (type === "meal") {
      randomUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
    } else if (type === "drink") {
      randomUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    }

    try {
      const response = await fetch(randomUrl);
      if (!response.ok) {
        throw new Error("Error fetching random data");
      }

      const data = await response.json();

      if (type === "meal") {
        console.log(data.meals);
        setSelectedRecipe(data.meals[0]);
      } else if (type === "drink") {
        setSelectedRecipe(data.drinks[0]);
      }
    } catch (error) {
      console.error("Error fetching random:", error.message);
    }
  };

  const handleSearch = (query, type) => {
    setSelectedRecipe(null);
    setQuery(query);
    setType(type);

    if (type === 'meal' && mealData) {
      setResults(mealData.meals);
    } else if (type === 'drink' && drinkData) {
      setResults(drinkData.drinks);
    }
  }

  return (
    <>
      <SearchBar
        onSearch={handleSearch}
      />
      {(mealLoading || drinkLoading) && <div className='loading'></div>}
      <RandomButton onClick={handleRandom} />
      {selectedRecipe && <RecipeDetails type={type} recipe={selectedRecipe} />}
      <SearchResults results={results} type={type} onSelect={handleSelect} />
    </>
  );
}

export default App;
