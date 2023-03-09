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
  | "_curentPage"
  | "_recipesOnPageCount";

export class RecipesStore implements ILocalStore {
  private _list: RecipesItemsModel[] = [];
  private _meta: Meta = Meta.initial;
  private _totalRes: number = 1;
  private _searchValue: string = "";
  private _timeouts: number[] = [];
  private _curentPage: number = 1;
  private _offsetValue: number = 0;
  private readonly _recipesOnPageCount: number = 16;

  constructor() {
    makeObservable<RecipesStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      _totalRes: observable.ref,
      _searchValue: observable.ref,
      _curentPage: observable,
      _recipesOnPageCount: observable.ref,
      list: computed,
      meta: computed,
      totalRes: computed,
      searchValue: computed,
      recipesOnPageCount: computed,
      curentPage: computed,
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
  get recipesOnPageCount(): number {
    return this._recipesOnPageCount;
  }
  get searchValue(): string {
    return this._searchValue;
  }
  get totalRes(): number {
    return this._totalRes;
  }
  get curentPage(): number {
    return this._curentPage;
  }
  setCurentPage = (value: number) => {
    this._curentPage = value;
  };
  setSearchValue = (value: string) => {
    this._searchValue = value === "null" ? "" : value;
  };
  async getRecipesList() {
    this._meta = Meta.loading;
    this._list = [];
    this._offsetValue = this._curentPage * this._recipesOnPageCount;

    const response: AxiosResponse = await axios({
      method: "GET",
      data: {},
      headers: {},
      url: `${API_ENDPOINTS.API_DOMAIN}${API_ENDPOINTS.API_GET_RECIPES}${
        this._searchValue === "null" ? "" : this._searchValue
      }${API_ENDPOINTS.API_RECIPES_PARAMS}${this._offsetValue}${
        API_ENDPOINTS.API_PARAMS
      }${API_ENDPOINTS.API_KEY}`,
    });

    runInAction(() => {
      if (response.status === 200) {
        try {
          this._meta = Meta.success;
          this._list = response.data.results.map(normalizeRecipesList);
          this._totalRes = response.data.totalResults;
        } catch (e) {
          this._meta = Meta.error;
          this._list = [];
        }
      } else this._meta = Meta.error;
    });
  }

  destroy(): void {
    this._qpSearchReaction();
  }
  private readonly _qpSearchReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("search"),
    () => {
      //Доделать отдельную модель для удаления старых таймаутов

      runInAction(() => {
        const timeout: any = setTimeout(() => {
          this.getRecipesList();
        }, 1000);
        this._timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
        this._timeouts = [];
        this._timeouts.push(timeout);
      });
    }
  );
}
