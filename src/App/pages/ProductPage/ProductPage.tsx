import React, { useEffect } from "react";

import Loader from "@components/Loader";
import { LoaderSize } from "@components/Loader/Loader";
import { ProductStore } from "@store/ProductStore/ProductsStore";
import { Meta } from "@utils/Meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";

import HealthIcon from "./images/HealthIcon.svg";
import TimeIcon from "./images/TimeIcon.svg";
import styles from "./ProductPage.module.scss";

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const productStore = useLocalStore(() => new ProductStore());

  useEffect(() => {
    productStore.setId(id);
  }, [productStore, id]);

  return (
    <>
      {productStore.meta === Meta.loading ? (
        <div className={styles.loader_block}>
          <Loader size={LoaderSize.l} />
        </div>
      ) : (
        <div className={styles.product_block}>
          <div className={styles.product_block__image_block}>
            <img
              className={styles.product_block__image}
              src={productStore.list.image}
              alt={productStore.list.title}
            />
            <Link to={"/"}>
              <div className={styles.go_back_icon}>
                <div className={styles.go_back_icon__arrow}></div>
              </div>
            </Link>
            <span className={styles.product_block__title_desctop}>
              {productStore.list.title}
            </span>
          </div>
          <div className={styles.product_block__description_block}>
            <div className={styles.scroller}></div>
            <div className={styles.product_block__title}>
              {productStore.list.title}
            </div>
            <div className={styles.product_block__short_info_block}>
              <p>
                <img src={TimeIcon} alt="Time-icon" />
                {productStore.list.cookingTime} minutes
              </p>
              <p>
                <img src={HealthIcon} alt="Helth-icon" />
                {productStore.list.healthScore} health score
              </p>
            </div>

            <div className={styles.product_block__main_info}>
              <p className={styles.product_block__small_title}>Ingredients:</p>
              <div className={styles.ingredients_block}>
                {/* {productStore.list.ingredients?.map(
                  (el: any, index: number) => (
                    <ul>
                      <li
                        className={styles.ingredients_block__ingredient}
                        key={index}
                      >
                        {el.name}
                        
                      </li>
                    </ul>
                  )
                )} */}
                {productStore.list.ingredients?.map(
                  (el: any, index: number) => (
                    <div key={index} className={styles.ingredients_block__item}>
                      <img
                        className={styles.ingredients_block__img}
                        src={`https://spoonacular.com/cdn/ingredients_100x100/${el.image}`}
                        alt={el.name}
                      />
                      <p>{el.name}</p>
                    </div>
                  )
                )}
              </div>

              <p className={styles.product_block__small_title}>How to cook:</p>
              <div
                className={styles.main_text_block}
                dangerouslySetInnerHTML={{
                  __html: productStore.list.descripton || "",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default observer(ProductPage);
