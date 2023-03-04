import React, { useEffect } from "react";

import Loader from "@components/Loader";
import { RecipesItemsModel } from "@models/Recipes/index";
import { RecipesStore } from "@store/RecipesStore/RecipesStore";
import { Meta } from "@utils/Meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useLocation, useSearchParams } from "react-router-dom";

import Card from "./components/Card/index";
import Input from "./components/Input/index";
import PaginationButton from "./components/PaginationButton";
import styles from "./MainPage.module.scss";

const MainPage: React.FC = () => {
  const recipesStore = useLocalStore(() => new RecipesStore());

  const location = `${useLocation().search}`;
  recipesStore.setSearchValue(
    `${location.length > 8 ? location.slice(8, location.length) : ""}`
  );

  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    recipesStore.getRecipesList();
  }, [recipesStore]);

  const changePageHandler = (value: number) => {
    recipesStore.setCurentPage(value);
  };

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
          ? recipesStore.list
              .filter(
                (item, index) =>
                  index > (recipesStore.сurentPage - 1) * 16 - 1 &&
                  index < recipesStore.сurentPage * 16
              )
              .map((item: RecipesItemsModel) => (
                <Card key={item.id} data={item} />
              ))
          : [...Array(16)].map((item) => (
              <div key={item} className={styles.loader_item}>
                {" "}
                <Loader />
              </div>
            ))}
      </div>
      <div className={styles.pagination_block}>
        <div className={styles.pagination_buttons}>
          {[
            ...Array.from(
              { length: Math.ceil(recipesStore.totalRes / 16) },
              (_, index) => index + 1
            ),
          ].map((number) => (
            <PaginationButton
              key={number}
              value={number}
              activeValue={recipesStore.сurentPage}
              onClickHandler={changePageHandler}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default observer(MainPage);
