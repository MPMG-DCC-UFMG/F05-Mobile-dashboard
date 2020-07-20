import {action, observable, runInAction} from "mobx";
import {TypeWork} from "../models/TypeWork";
import {BaseStore} from "./BaseStore";
import {TypeWorkService} from "../services/TypeWorkService";

export class TypeWorkStore extends BaseStore {

    private fullTypeWorksList: TypeWork[] = [];

    @observable typeWorksList: TypeWork[] = [];
    @observable selectedTypeWork?: TypeWork = undefined

    @action
    async loadTypeWorkList() {
        this.baseCall(async () => {
            const typeWorks = await TypeWorkService.loadTypeWorks()
            runInAction(() => {
                    this.fullTypeWorksList = typeWorks;
                    this.search("")
                }
            )
        })
    }

    @action
    search(query?: string) {
        if (query) {
            this.typeWorksList = this.fullTypeWorksList.filter(item => item.name.includes(query))
        } else {
            this.typeWorksList = this.fullTypeWorksList
        }
    }

    @action
    selectTypeWork(typeWork?: TypeWork) {
        this.selectedTypeWork = typeWork
    }

    @action
    async deleteTypeOfWork(typeWorkFlag: number) {
        this.baseCall(async () => {
            await TypeWorkService.deleteTypeWork(typeWorkFlag)
            runInAction(() => {
                this.loadTypeWorkList()
            })
        })
    }

    @action
    async addTypeWork(typeWork: TypeWork) {
        if (typeWork.name) {
            this.baseCall(async () => {
                await TypeWorkService.addTypeWork(typeWork)
                runInAction(() => {
                    this.loadTypeWorkList()
                })
            })
        }
    }

    @action
    async updateTypeWork(typeWork: TypeWork) {
        if (typeWork.name && typeWork.flag) {
            this.baseCall(async () => {
                await TypeWorkService.updateTypeWork(typeWork)
                runInAction(() => {
                    this.loadTypeWorkList()
                })
            })
        }
    }


}