/* eslint-disable @typescript-eslint/no-unused-vars */
import { action, observable, runInAction } from "mobx";
import { Collect } from "../models/Collect";
import { PaginatedResponse } from "../network/models/PaginatedResponse";
import { CollectService } from "../network/services/CollectService";
import { BaseStore } from "./BaseStore";

export class CollectStore extends BaseStore {
  @observable paginatedCollects?: PaginatedResponse<Collect> = undefined;
  @observable selectedCollect?: Collect = undefined;
  private currPage: number = 1;

  @action
  async loadCollects() {
    this.baseCall(async () => {
      const paginatedCollects = await CollectService.loadCollectsPaginated(
        this.currPage
      );
      runInAction(() => {
        this.paginatedCollects = paginatedCollects;
      });
    });
  }

  @action
  selectCollect(collect?: Collect) {
    this.selectedCollect = collect;
  }
}
