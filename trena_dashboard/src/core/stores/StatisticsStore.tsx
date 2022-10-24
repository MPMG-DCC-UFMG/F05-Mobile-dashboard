/* eslint-disable @typescript-eslint/no-unused-vars */
import { action, observable, runInAction } from "mobx";
import { CollectService } from "../network/services/CollectService";
import { PublicWorkService } from "../network/services/PublicWorkService";
import { QueueService } from "../network/services/QueueService";
import { BaseStore } from "./BaseStore";

export class StatisticsStore extends BaseStore {
  @observable publicWorkCount: number = 0;
  @observable collectMonthCount: number = 0;
  @observable queueCount: number = 0;

  @action
  async countPublicWork() {
    this.baseCall(async () => {
      const count = await PublicWorkService.countPublicWork();
      runInAction(() => {
        this.publicWorkCount = count;
      });
    });
  }

  @action
  async countMonthCollects() {
    this.baseCall(async () => {
      const count = await CollectService.collectMonthCount();
      runInAction(() => {
        this.collectMonthCount = count;
      });
    });
  }

  @action
  async countQueue() {
    this.baseCall(async () => {
      const count = await QueueService.countQueue();
      runInAction(() => {
        this.queueCount = count;
      });
    });
  }
}
