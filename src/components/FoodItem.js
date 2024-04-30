import React from "react";
import styles from "./fooditem.module.css";

export default function FoodItem({ food, setFoodId }) {
  return (
    <div className={styles.container}>
      <img src={food.image} alt="" className={styles.imageItem} />
      <div className={styles.itemContent}>
        <p>{food.title}</p>
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={styles.itemButton}
          onClick={() => {
            setFoodId(food.id);
          }}
        >
          Read More
        </button>
      </div>
    </div>
  );
}
