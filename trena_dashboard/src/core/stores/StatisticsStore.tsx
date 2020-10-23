import {BaseStore} from "./BaseStore";
import {action, observable, runInAction} from "mobx";
import {PublicWorkService} from "../network/services/PublicWorkService";
import {CollectService} from "../network/services/CollectService";

export class StatisticsStore extends BaseStore {

    @observable publicWorkCount: number = 0
    @observable collectMonthCount: number = 0

    @action
    async countPublicWork() {
        this.baseCall(async () => {
            const count = await PublicWorkService.countPublicWork()
            runInAction(() => {
                this.publicWorkCount = count
            })
        })
    }

    @action
    async countMonthCollects() {
        this.baseCall(async () => {
            const count = await CollectService.collectMonthCount()
            runInAction(() => {
                this.collectMonthCount = count
            })
        })
    }
}