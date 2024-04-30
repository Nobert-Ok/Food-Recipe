import { useEffect, useState } from "react";
import styles from "./fooddetails.module.css";

export default function FoodDetails({ foodId }) {
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipe() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setFood(data);
      setIsLoading(false);
    }
    fetchRecipe();
  }, [foodId]);
  return (
    <div>
      <div className={styles.recipeCard}>
        <h1>{food.title}</h1>
        <img className={styles.recipeImage} src={food.image} />
        <div className={styles.recipeDetail}>
          <span>
            <strong>⌚️ {food.readyInMinutes} mins</strong>
          </span>
          <span>
            <strong>Serves: {food.servings}</strong>
          </span>
          <span>
            <strong>
              {food.vegetarian ? "🥕 Vegetarian" : "🍖 Non-vegetarian"}
            </strong>
          </span>
          <span>
            <strong>{food.vegan ? "🐮 Vegan" : ""}</strong>
          </span>
        </div>{" "}
        <div>
          <span>$ {food.pricePerServing / 100} Per serving</span>
        </div>
        <h2>Ingredients</h2>
        {isLoading
          ? "Loading"
          : food.extendedIngredients.map((item) => (
              <div key={item.id} className={styles.itemContainer}>
                <div className={styles.imageContainer}>
                  <img
                    className={styles.image}
                    src={
                      `https://img.spoonacular.com/ingredients_100x100/` +
                      item.image
                    }
                  />
                </div>
                <div className={styles.nameContainer}>
                  <div className={styles.name}>
                    <h3>{item.name}</h3>
                  </div>
                  <div className={styles.amount}>
                    <h3>
                      {item.amount} {item.unit}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
        <h2>Instructions</h2>
        <div className={styles.recipeInstruction}>
          {isLoading ? (
            "Loading"
          ) : food.analyzedInstructions &&
            food.analyzedInstructions.length > 0 ? (
            <ol>
              {food.analyzedInstructions[0].steps.map((step) => (
                <li key={step.number}>{step.step}</li>
              ))}
            </ol>
          ) : (
            "No instructions available"
          )}
        </div>
      </div>
    </div>
  );
}
