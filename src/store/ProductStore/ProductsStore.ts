import { API_ENDPOINTS } from "@config/api";
import { ProductItemsModel, normalizeProductList } from "@models/Product/index";
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

type PrivateFields = "_list" | "_meta" | "_id";
export class ProductStore implements ILocalStore {
  private _list: ProductItemsModel = {};
  private _meta: Meta = Meta.initial;
  private _id: string | undefined;

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      _id: observable,
      list: computed,
      meta: computed,
      id: computed,
      setId: action,
      getProductList: action,
    });
  }

  get meta(): Meta {
    return this._meta;
  }

  get id(): string | undefined {
    return this._id;
  }

  get list(): ProductItemsModel {
    return this._list;
  }

  setId(id: string | undefined) {
    this._id = id;
  }

  async getProductList() {
    this._meta = Meta.loading;

    try {
      const response: AxiosResponse = await axios({
        method: "GET",
        data: {},
        headers: {},
        url: `${API_ENDPOINTS.API_DOMAIN}${this._id}${API_ENDPOINTS.API_PRODUCT_PARAMS}${API_ENDPOINTS.API_KEY}`,
      });
      runInAction(() => {
        if (response.status === 200) {
          this._meta = Meta.success;
          this._list = normalizeProductList(response.data);
        } else this._meta = Meta.error;
      });
    } catch (e) {
      this._meta = Meta.error;
    }
  }

  destroy(): void {
    this._idReaction();
  }

  private readonly _idReaction: IReactionDisposer = reaction(
    () => this._id,
    () => {
      this.getProductList();
    }
  );
}
