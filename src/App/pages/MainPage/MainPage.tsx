import React, { useCallback, useEffect } from "react";

import Loader from "@components/Loader";
import { RecipesItemsModel } from "@models/Recipes/index";
import { RecipesStore } from "@store/RecipesStore/RecipesStore";
import { Meta } from "@utils/Meta";
import { PaginationFilter } from "@utils/PaginationFilter";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import Card from "./components/Card/index";
import Input from "./components/Input/index";
import PaginationButton from "./components/PaginationButton";
import styles from "./MainPage.module.scss";

const MainPage: React.FC = () => {
  const recipesStore = useLocalStore(() => new RecipesStore());

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    recipesStore.setSearchValue(
      `${searchParams.get("search") ? searchParams.get("search") : ""}`
    );
    recipesStore.setCurentPage(
      searchParams.get("page") ? Number(searchParams.get("page")) : 1
    );
    if (
      searchParams.get("page") === String(recipesStore.curentPage) &&
      searchParams.get("search") === recipesStore.searchValue
    ) {
      recipesStore.getRecipesList();
    } else {
      setSearchParams({
        search: `${recipesStore.searchValue}`,
        page: `${1}`,
      });
    }
  }, [recipesStore, setSearchParams, searchParams]);

  const changePageHandler = useCallback(
    (value: number) => {
      recipesStore.setCurentPage(value);
      setSearchParams({
        search: `${recipesStore.searchValue}`,
        page: `${recipesStore.curentPage}`,
      });
    },
    [recipesStore, setSearchParams]
  );

  const changeInputHandler = useCallback(
    (value: string) => {
      recipesStore.setCurentPage(1);
      recipesStore.setSearchValue(value);
      setSearchParams({
        search: `${value}`,
        page: `${recipesStore.curentPage}`,
      });
    },
    [recipesStore, setSearchParams]
  );

  return (
    <>
      <header>
        <Input
          value={recipesStore.searchValue}
          placeholder="Search"
          onChange={(value: string) => {
            changeInputHandler(value);
          }}
        />
      </header>
      <div className={styles.main_title}>Recipes</div>
      <div className={styles.food_block}>
        {recipesStore.meta === Meta.success
          ? recipesStore.list.map((item: RecipesItemsModel) => (
            <Card key={item.id} data={item} />
          ))
          : [...Array(recipesStore.recipesOnPageCount)].map((item) => (
            <div key={item} className={styles.loader_item}>
              {" "}
              <Loader />
            </div>
          ))}
      </div>
      <div className={styles.pagination_block}>
        <div className={styles.pagination_buttons}>
          {PaginationFilter(
            recipesStore.curentPage,
            recipesStore.totalRes,
            recipesStore.recipesOnPageCount
          ).map((number, index) => (
            <PaginationButton
              key={index}
              value={number}
              activeValue={recipesStore.curentPage}
              onClickHandler={changePageHandler}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default observer(MainPage);
