import React, { memo } from "react";

import { RecipesItemsModel } from "@models/Recipes/index";
import { Link } from "react-router-dom";

import styles from "./Card.module.scss";
export type CardProps = {
  data: RecipesItemsModel;
};

const Card: React.FC<CardProps> = ({ data }) => {
  const ingredientsList = data.ingredients.map((item: any) => item.name);
  return (
    <div className={styles.card}>
      <Link to={`/product/${data.id}`}>

        <img className={styles.card__image} src={data.image} alt={data.title} />

        <div className={styles.card__content_block}>
          <div className={styles.card__content_block__title}>
            {data.title.split("").length > 15
              ? `${data.title.slice(0, 20)}...`
              : data.title}
          </div>
          <div className={styles.card__content_block__title_desktop}>

            {data.title.split("").length > 45
              ? `${data.title.slice(0, 45)}...`
              : data.title}
          </div>
          <div className={styles.card__content_block__subtitle}>
            {ingredientsList.length > 3
              ? ingredientsList.slice(0, 3).join(" + ")
              : ingredientsList.join("+")}
          </div>

          <div className={styles.card__content_block__calories}>
            <p>{data.calories} kcal</p>{" "}
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

export default memo(Card);
