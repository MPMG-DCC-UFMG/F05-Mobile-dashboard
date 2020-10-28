import {BaseStore} from "./BaseStore";
import {action, observable, runInAction} from "mobx";
import {WorkStatus} from "../models/WorkStatus";
import {WorkStatusService} from "../network/services/WorkStatusService";

export class WorkStatusStore extends BaseStore {

    @observable workStatusList: WorkStatus[] = [];

    @action
    async loadWorkStatus() {
        this.baseCall(async () => {
            const workStatus = await WorkStatusService.loadWorkStatus()
            runInAction(() => {
                    this.workStatusList = workStatus;
                }
            )
        })
    }

    getWorkStatusByFlag = (flag: number): WorkStatus | undefined => {
        return this.workStatusList.find(x => x.flag === flag)
    }
}