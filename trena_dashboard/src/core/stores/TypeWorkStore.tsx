import {action, observable, runInAction} from "mobx";
import {TypeWork} from "../models/TypeWork";
import {BaseStore} from "./BaseStore";
import {TypeWorkService} from "../network/services/TypeWorkService";
import {WorkStatus} from "../models/WorkStatus";
import {TypePhoto} from "../models/TypePhoto";

export class TypeWorkStore extends BaseStore {

    private fullTypeWorksList: TypeWork[] = [];

    @observable typeWorksList: TypeWork[] = [];
    @observable selectedTypeWork?: TypeWork = undefined
    @observable typeWorkWorkStatus: WorkStatus[] = []
    @observable typeWorkTypePhoto: TypePhoto[] = []

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
            this.typeWorksList = this.fullTypeWorksList.filter(item => item.name.toUpperCase().includes(query.toUpperCase()))
        } else {
            this.typeWorksList = this.fullTypeWorksList
        }
    }

    @action
    selectTypeWork(typeWork?: TypeWork) {
        this.selectedTypeWork = typeWork
        this.loadSelectedTypeWorkWorkStatus()
        this.loadSelectedTypeWorkTypePhotos()
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

    @action
    async updateTypeWorkWorkStatus(workStatuses: number[], typeWorkFlag: number) {
        this.baseCall(async () => {
            await TypeWorkService.updateTypeWorkWorkStatus(workStatuses, typeWorkFlag)
            runInAction(() => {
                this.loadSelectedTypeWorkWorkStatus()
            })
        })
    }

    @action
    async loadSelectedTypeWorkWorkStatus() {
        if (this.selectedTypeWork) {
            this.baseCall(async () => {
                const workStatus = await TypeWorkService.loadTypeWorkWorkStatus(this.selectedTypeWork!.flag!)
                runInAction(() => {
                        this.typeWorkWorkStatus = workStatus;
                    }
                )
            })
        }
    }

    @action
    async updateTypeWorkTypePhoto(typePhotos: number[], typeWorkFlag: number) {
        this.baseCall(async () => {
            await TypeWorkService.updateTypeWorkTypePhoto(typePhotos, typeWorkFlag)
            runInAction(() => {
                this.loadSelectedTypeWorkTypePhotos()
            })
        })
    }

    @action
    async loadSelectedTypeWorkTypePhotos() {
        if (this.selectedTypeWork) {
            this.baseCall(async () => {
                const typePhotos = await TypeWorkService.loadTypeWorkTypePhotos(this.selectedTypeWork!.flag!)
                runInAction(() => {
                        this.typeWorkTypePhoto = typePhotos;
                    }
                )
            })
        }
    }
}