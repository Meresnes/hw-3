import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link, useParams } from "react-router-dom";

import HealthIcon from "./images/HealthIcon.svg";
import TimeIcon from "./images/TimeIcon.svg";
import styles from "./ProductPage.module.scss";

const apiKey = "22fca36cc74d47d6b3f5ac032690c948";
// interface IResultTypes {
//   id: number;
//   data: any;
//   cookingMinutes: number;
//   image: string;
//   instructions: string;
//   title: string;
// }
// type DataTypes = {
//   image: string;
//   title: string;
// };
//https://api.spoonacular.com/recipes/715415/information?apiKey=0aa691061ee141258c142261650e5b08
const ProductPage = () => {
  const [productData, setProductData] = useState<any>({});
  const { id } = useParams();
  useEffect(() => {
    const fetch = async () => {
      const result: object | any = await axios({
        method: "get",
        url: `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey}`,
      });
      setProductData(result.data);
    };
    fetch();
  }, [id]);
  // console.log(productData)

  return (
    <>
      {Object.keys(productData).length > 0 && (
        <div className={styles.product_block}>
          <div className={styles.product_block__image_block}>
            <img src={productData.image} alt={productData.title} />
            <Link to={"/"}>
              <div className={styles.go_back_icon}>
                {" "}
                <div className={styles.go_back_icon__arrow}></div>{" "}
              </div>
            </Link>
          </div>
          <div className={styles.product_block__description_block}>
            <div className={styles.scroller}></div>
            <div className={styles.product_block__title}>
              {productData.title}
            </div>
            <div className={styles.product_block__short_info_block}>
              <p>
                <img src={TimeIcon} alt="Time-icon" />{" "}
                {productData.readyInMinutes} minutes
              </p>
              <p>
                <img src={HealthIcon} alt="Helth-icon" />
                {productData.healthScore} health score
              </p>
            </div>
            <ul>
              {/* {productData.length > 0 && productData.extendedIngredients.map((item: any) => (
                            <li>{item.nameClean}</li>
                        )).filter((item: any, index: number) => index < 5)} */}
            </ul>
            <div className={styles.product_block__main_info}>
              <div
                dangerouslySetInnerHTML={{ __html: productData.instructions }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
