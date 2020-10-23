import {PublicWork} from "../models/PublicWork";
import {action, observable, runInAction} from "mobx";
import {BaseStore} from "./BaseStore";
import {PublicWorkService} from "../network/services/PublicWorkService";
import {Collect} from "../models/Collect";
import {CollectService} from "../network/services/CollectService";


export class PublicWorkStore extends BaseStore {

    private fullPublicWorkList: PublicWork[] = [];

    @observable publicWorkList: PublicWork[] = [];
    @observable selectedPublicWork?: PublicWork = undefined;
    @observable collectsOfPublicWork: Collect[] = [];


    @action
    async loadPublicWorkList() {
        this.baseCall(async () => {
            const publicWorks = await PublicWorkService.loadPublicWorks()
            runInAction(() => {
                this.fullPublicWorkList = publicWorks;
                this.search("")
            })
        })
    }

    @action
    search(query?: string) {
        if (!query || /^\s*$/.test(query)) {
            this.publicWorkList = this.fullPublicWorkList
        } else {
            this.publicWorkList = this.fullPublicWorkList.filter(item => item.name.includes(query))
        }
    }

    @action
    selectPublicWork(publicWork?: PublicWork) {
        this.selectedPublicWork = publicWork
        if (publicWork) {
            this.loadPublicWorkCollects(publicWork?.id)
        }
    }

    @action
    async deletePublicWork(publicWorkId: string) {
        this.baseCall(async () => {
            await PublicWorkService.deletePublicWork(publicWorkId)
            runInAction(() => {
                this.loadPublicWorkList()
            })
        })
    }

    @action
    async addPublicWork(publicWork: PublicWork) {
        this.baseCall(async () => {
            await PublicWorkService.addPublicWork(publicWork)
            runInAction(() => {
                this.loadPublicWorkList()
            })
        })
    }

    @action
    async updatePublicWork(publicWork: PublicWork) {
        this.baseCall(async () => {
            await PublicWorkService.updatePublicWork(publicWork)
            runInAction(() => {
                this.loadPublicWorkList()
            })
        })
    }

    @action
    async loadPublicWorkCollects(publicWorkId: string) {
        this.baseCall(async () => {
            const collects = await CollectService.loadPublicWorkCollects(publicWorkId)
            runInAction(() => {
                this.collectsOfPublicWork = collects
            })
        })
    }


}