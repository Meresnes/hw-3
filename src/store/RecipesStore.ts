import { API_ENDPOINTS } from "@config/api";
import { RecipesItemsModel, normalizeRecipesList } from "@models/Recipes/index";
import { Meta } from "@utils/Meta";
import { ILocalStore } from "@utils/useLocalStore";
import axios, { AxiosResponse } from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

type PrivateFields = "_list" | "_meta" | "_totalRes";

export class RecipesStore implements ILocalStore {
  private _list: RecipesItemsModel[] = [];
  private _meta: Meta = Meta.initial;
  private _totalRes: number | null = null;

  constructor() {
    makeObservable<RecipesStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      _totalRes: observable,
      list: computed,
      meta: computed,
      totalRes: computed,
      getRecipesList: action,
    });
  }
  get list(): RecipesItemsModel[] {
    return this._list;
  }
  get meta(): Meta {
    return this._meta;
  }
  get totalRes(): number | null {
    return this._totalRes;
  }
  async getRecipesList() {
    this._meta = Meta.loading;
    this._list = [];
    const response: AxiosResponse = await axios({
      method: "GET",
      data: {},
      headers: {},
      url: `${API_ENDPOINTS.GET_RECIPES}${API_ENDPOINTS.API_KEY}`,
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
          this._totalRes = response.data.number;
        } catch (e) {
          this._meta = Meta.error;
          this._list = [];
        }
      } else this._meta = Meta.error;
    });
  }

  destroy(): void {}
}
