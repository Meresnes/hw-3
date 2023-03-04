import React, { useEffect } from "react";

import Loader from "@components/Loader";
import { RecipesItemsModel } from "@models/Recipes/index";
import { RecipesStore } from "@store/RecipesStore/RecipesStore";
import { Meta } from "@utils/Meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import Card from "./components/Card/index";
import Input from "./components/Input/index";
import styles from "./MainPage.module.scss";

const MainPage: React.FC = () => {
  console.log("main");
  const recipesStore = useLocalStore(() => new RecipesStore());
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    recipesStore.getRecipesList();
  }, [recipesStore]);

  return (
    <>
      <header>
        <Input
          value={recipesStore.searchValue}
          placeholder="Search"
          onChange={(value) => {
            recipesStore.setSearchValue(value);
            setSearchParams(`search=${value}`);
          }}
        />
      </header>
      <div className={styles.main_title}>Recipes</div>
      <div className={styles.food_block}>
        {recipesStore.meta === Meta.success
          ? recipesStore.list.map((item: RecipesItemsModel) => (
              <Card key={item.id} data={item} />
            ))
          : [...Array(12)].map((item) => (
              <div key={item} className={styles.loader_item}>
                {" "}
                <Loader />
              </div>
            ))}
      </div>
    </>
  );
};
export default observer(MainPage);
