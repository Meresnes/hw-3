import { API_ENDPOINTS } from "@config/api";
import { RecipesItemsModel, normalizeRecipesList } from "@models/Recipes/";
import rootStore from "@store/RootStore";
import { Meta } from "@utils/Meta";
import { ILocalStore } from "@utils/useLocalStore";
import axios, { AxiosResponse } from "axios";
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from "mobx";

type PrivateFields =
  | "_list"
  | "_meta"
  | "_totalRes"
  | "_searchValue"
  | "_curentPage";

export class RecipesStore implements ILocalStore {
  private _list: RecipesItemsModel[] = [];
  private _meta: Meta = Meta.initial;
  private _totalRes: number = 1;
  private _searchValue: string = "";
  private _timeouts: number[] = [];
  private _curentPage: number = 1;

  constructor() {
    makeObservable<RecipesStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      _totalRes: observable,
      _searchValue: observable,
      _curentPage: observable,
      list: computed,
      meta: computed,
      totalRes: computed,
      searchValue: computed,
      сurentPage: computed,
      setCurentPage: action,
      getRecipesList: action,
      setSearchValue: action,
    });
  }
  get list(): RecipesItemsModel[] {
    return this._list;
  }
  get meta(): Meta {
    return this._meta;
  }
  get searchValue(): string {
    return this._searchValue;
  }
  get totalRes(): number {
    return this._totalRes;
  }
  get сurentPage(): number {
    return this._curentPage;
  }
  setCurentPage = (value: number) => {
    this._curentPage = value;
  };
  setSearchValue = (value: string) => {
    this._searchValue = value;
  };
  async getRecipesList() {
    this._meta = Meta.loading;
    this._list = [];
    this._curentPage = 1;

    const response: AxiosResponse = await axios({
      method: "GET",
      data: {},
      headers: {},
      url: `${API_ENDPOINTS.API_DOMAIN}${API_ENDPOINTS.API_GET_RECIPES}${this._searchValue}${API_ENDPOINTS.API_RECIPES_PARAMS}${API_ENDPOINTS.API_KEY}`,
    });

    runInAction(() => {
      if (response.status === 200) {
        try {
          this._meta = Meta.success;
          const list = [];

          for (const item of response.data.results) {
            list.push(normalizeRecipesList(item));
          }
          this._list = list;
          this._totalRes = response.data.results.length;
        } catch (e) {
          this._meta = Meta.error;
          this._list = [];
        }
      } else this._meta = Meta.error;
    });
  }

  destroy(): void {
    this._qpReaction();
  }
  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("search"),
    () => {
      //Доделать отдельную модель для удаления старых таймаутов
      const timeout: any = setTimeout(() => {
        this.getRecipesList();
      }, 1000);
      this._timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
      this._timeouts = [];
      this._timeouts.push(timeout);
    }
  );
}
