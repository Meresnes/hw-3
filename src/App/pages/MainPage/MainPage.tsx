import React, { useCallback, useEffect } from "react";

import Loader from "@components/Loader";
import { RecipesItemsModel } from "@models/Recipes/index";
import { RecipesStore } from "@store/RecipesStore/RecipesStore";
import { Meta } from "@utils/Meta";
import { PaginationFilter } from "@utils/PaginationFilter";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import Card from "./components/Card";
import Input from "./components/Input";
import MultiDropdown, { Option } from "./components/MultiDropdown";
import PaginationButton from "./components/PaginationButton";
import SadSmile from "./images/sad_cat.png";
import SearchIcon from "./images/search-icon.png";
import styles from "./MainPage.module.scss";

const MainPage: React.FC = () => {
  const recipesStore = useLocalStore(() => new RecipesStore());
  const [searchParams, setSearchParams] = useSearchParams();

  const paramsSearchValue = searchParams.get("search");
  const paramsPageValue = searchParams.get("page");
  const paramsRecipesTypeValue = searchParams.get("type");

  const TypeValues = [
    { key: "", value: "Select a category" },
    { key: "main course", value: "Main course" },
    { key: "side dish", value: "Side dish" },
    { key: "dessert", value: "Dessert" },
    { key: "appetizer", value: "Appetizer" },
    { key: "salad", value: "Salad" },
    { key: "bread", value: "Bread" },
    { key: "breakfast", value: "Breakfast" },
    { key: "soup", value: "Soup" },
    { key: "fingerfood", value: "Fingerfood" },
    { key: "snack", value: "Snack" },
    { key: "drink", value: "Drink" },
  ];

  useEffect(() => {
    recipesStore.setSearchValue(
      `${paramsSearchValue ? paramsSearchValue : ""}`
    );

    recipesStore.setRecipesType(
      `${paramsRecipesTypeValue ? paramsRecipesTypeValue : ""}`
    );

    recipesStore.setCurentPage(paramsPageValue ? Number(paramsPageValue) : 1);

    if (
      paramsPageValue === String(recipesStore.curentPage) &&
      paramsSearchValue === recipesStore.searchValue &&
      paramsRecipesTypeValue === recipesStore.recipesType
    )
      recipesStore.getRecipesList();
    else {
      setSearchParams({
        search: `${recipesStore.searchValue}`,
        page: `${1}`,
        type: `${recipesStore.recipesType}`,
      });
    }
  }, [recipesStore]);

  const changePageHandler = useCallback(
    (value: number) => {
      recipesStore.setCurentPage(value);
      setSearchParams({
        search: `${recipesStore.searchValue}`,
        page: `${recipesStore.curentPage}`,
        type: `${recipesStore.recipesType}`,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [recipesStore, setSearchParams]
  );

  const changeTypeHandler = useCallback(
    (value: Option) => {
      recipesStore.setCurentPage(1);
      recipesStore.setRecipesType(value.key);
      setSearchParams({
        search: `${recipesStore.searchValue}`,
        page: `${recipesStore.curentPage}`,
        type: `${value.key}`,
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
        type: `${recipesStore.recipesType}`,
      });
    },
    [recipesStore, setSearchParams]
  );

  return (
    <>
      <header>
        <div className={styles.header_block}>
          <img
            className={styles.header_block__img}
            src={SearchIcon}
            alt="author: Dimitry Miroliubov"
          />
          <Input
            value={recipesStore.searchValue}
            placeholder="Search"
            onChange={(value: string) => {
              changeInputHandler(value);
            }}
          />
        </div>
        <div className={styles.header_block}>
          <div className={styles.header__dropdown_block}>
            <MultiDropdown
              onChange={(value) => changeTypeHandler(value)}
              value={
                paramsRecipesTypeValue
                  ? paramsRecipesTypeValue
                  : "Select a category"
              }
              options={TypeValues}
            />
          </div>
        </div>
      </header>
      <div className={styles.main_title}>Recipes</div>
      <div className={styles.food_block}>
        {recipesStore.meta === Meta.success ? (
          recipesStore.list.length > 0 ? (
            recipesStore.list.map((item: RecipesItemsModel) => (
              <Card key={item.id} data={item} />
            ))
          ) : (
            <div className={styles.no_results_block}>
              <p className={styles.no_results_block__text}>Nothing found</p>
              <img
                className={styles.no_results_block__image}
                src={SadSmile}
                alt="SadIcon"
              />
            </div>
          )
        ) : (
          [...Array(recipesStore.recipesOnPageCount)].map((item) => (
            <div key={item} className={styles.loader_item}>
              <Loader />
            </div>
          ))
        )}
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
