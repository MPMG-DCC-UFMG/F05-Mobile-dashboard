import {BaseStore} from "./BaseStore";
import {action, observable, runInAction} from "mobx";
import {WorkStatus} from "../models/WorkStatus";
import {WorkStatusService} from "../network/services/WorkStatusService";

export class WorkStatusStore extends BaseStore {

    private fullWorkStatusList: WorkStatus[] = [];

    @observable selectedWorkStatus?: WorkStatus = undefined
    @observable workStatusList: WorkStatus[] = [];

    @action
    async loadWorkStatus() {
        this.baseCall(async () => {
            const workStatusList = await WorkStatusService.loadWorkStatus()
            runInAction(() => {
                    this.fullWorkStatusList = workStatusList;
                    this.search("")
                }
            )
        })
    }

    @action
    selectWorkStatus(workStatus?: WorkStatus) {
        this.selectedWorkStatus = workStatus
    }

    @action
    search(query?: string) {
        if (query) {
            this.workStatusList = this.fullWorkStatusList.filter(item => item.name.toUpperCase().includes(query.toUpperCase()))
        } else {
            this.workStatusList = this.fullWorkStatusList
        }
    }

    @action
    async deleteWorkStatus(workStatusFlag: number) {
        this.baseCall(async () => {
            await WorkStatusService.deleteWorkStatus(workStatusFlag)
            runInAction(() => {
                this.loadWorkStatus()
            })
        })
    }

    @action
    async addWorkStatus(workStatus: WorkStatus) {
        if (workStatus.name) {
            this.baseCall(async () => {
                await WorkStatusService.addWorkStatus(workStatus)
                runInAction(() => {
                    this.loadWorkStatus()
                })
            })
        }
    }

    @action
    async updateWorkStatus(workStatus: WorkStatus) {
        if (workStatus.name && workStatus.flag) {
            this.baseCall(async () => {
                await WorkStatusService.updateWorkStatus(workStatus)
                runInAction(() => {
                    this.loadWorkStatus()
                })
            })
        }
    }

    getWorkStatusByFlag = (flag: number): WorkStatus | undefined => {
        return this.fullWorkStatusList.find(x => x.flag === flag)
    }
}