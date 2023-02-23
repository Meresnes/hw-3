import React from "react";

import { Link } from "react-router-dom";

import styles from "./Card.module.scss";
export type CardProps = {
  image: string;
  title: string;
  id: number;
  calories: string;
  ingredients: string[];
};

const Card: React.FC<CardProps> = ({
  image,
  title = "title",
  calories,
  ingredients,
  id,
}) => {
  const ingredientsList = ingredients.map((item: any) => item.name);

  return (
    <div className={styles.card}>
      <Link to={`/product/${id}`}>
        <img className={styles.card__image} src={image} alt={title} />

        <div className={styles.card__content_block}>
          <div className={styles.card__content_block__title}>
            {title.split("").length > 15 ? `${title.slice(0, 15)}...` : title}
          </div>
          <div className={styles.card__content_block__title_desktop}>
            {title}
          </div>
          <div className={styles.card__content_block__subtitle}>
            {ingredientsList.length > 3
              ? ingredientsList.slice(0, 3).join(" + ")
              : ingredientsList.join("+")}
          </div>

          <div className={styles.card__content_block__calories}>
            <p>{calories} kcal</p>{" "}
            <div className={styles.add_icon}>
              <div className={styles.add_icon__vertical_line}></div>
              <div className={styles.add_icon__horizontal_line}></div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
