import { action, makeObservable, observable } from "mobx";
import * as qs from "qs";

type PrivateFields = "_params";

export default class QueryParamsStore {
  private _params: any = { search: "", page: "" };
  private _search: string = "";

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      setSearch: action,
    });
  }

  getParam(key: string): any {
    return this._params[key];
  }

  setSearch(search: string) {
    search = search.startsWith("?") ? search.slice(1) : search;
    if (this._search !== search) {
      this._search = search;
      this._params = { ...this._params, search: qs.parse(search) };
    }
  }
}
