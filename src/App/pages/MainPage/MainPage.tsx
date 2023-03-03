import { useEffect, useState } from "react";

import Loader from "@components/Loader";
import { RecipesItemsModel } from "@models/Recipes/index";
import { RecipesStore } from "@store/RecipesStore";
import { Meta } from "@utils/Meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";

import Card from "./components/Card/index";
import Input from "./components/Input/index";
import styles from "./MainPage.module.scss";

const MainPage = () => {
  const recipesStore = useLocalStore(() => new RecipesStore());

  useEffect(() => {
    recipesStore.getRecipesList();
  }, [recipesStore]);

  const [searchValue, setSearchValuse] = useState("");

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
        {recipesStore.meta === Meta.success
          ? recipesStore.list
              .filter((item: RecipesItemsModel) =>
                item.title
                  .toLowerCase()
                  .includes(searchValue.toLocaleLowerCase())
              )
              .map((item: RecipesItemsModel) => (
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
