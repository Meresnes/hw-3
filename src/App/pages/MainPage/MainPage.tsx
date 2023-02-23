import React, { useEffect, useState } from "react";

import Loader from "@components/Loader";
import { API_ENDPOINTS } from "@config/api";
import axios from "axios";

import Card from "./components/Card/index";
import Input from "./components/Input/index";
import styles from "./MainPage.module.scss";
type DataTypes = {
  id: number;
  title: string;
  image: string;
  nutrition: any;
};

const MainPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValuse] = useState("");
  useEffect(() => {
    const urlApi = `${API_ENDPOINTS.GET_RECIPES}${API_ENDPOINTS.API_KEY}`;
    // const urlApi = `https://api.spoonacular.com/recipes/complexSearch?addRecipeNutrition=true&apiKey=`
    const fetch = async () => {
      const result = await axios({
        method: "get",
        url: urlApi,
      });
      setData(
        result.data.results.map((item: DataTypes) => ({
          id: item.id,
          title: item.title,
          image: item.image,
          ingredients: item.nutrition.ingredients,
          calories: item.nutrition.nutrients[0].amount,
        }))
      );
      setIsLoading(false);
    };
    fetch();
  }, []);

  const searchValueHandler = (value: string) => {
    setSearchValuse(value);
  };

  return (
    <>
      <header>
        <Input
          value={searchValue}
          placeholder="Search"
          onChange={(value) => searchValueHandler(value)}
        />
      </header>

      <div className={styles.main_title}>Recipes</div>
      <div className={styles.food_block}>
        {isLoading &&
          [...Array(12)].map((item) => (
            <div key={item} className={styles.loader_item}>
              {" "}
              <Loader />
            </div>
          ))}
        {!isLoading &&
          data
            .filter((item: any) =>
              item.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
            )
            .map((item: any) => (
              <Card
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                calories={item.calories}
                ingredients={item.ingredients}
              />
            ))}
      </div>
    </>
  );
};
export default MainPage;
