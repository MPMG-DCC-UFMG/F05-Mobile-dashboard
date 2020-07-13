import {PublicWork} from "../models/PublicWork";
import {action, observable, runInAction} from "mobx";
import {PublicWorkService} from "../services/PublicWorkService";

export class PublicWorkStore {

    private fullPublicWorkList: PublicWork[] = [];

    @observable publicWorkList: PublicWork[] = [];
    @observable isLoading = false;
    @observable selectedPublicWork?: PublicWork = undefined;

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

    baseCall(tryContent: () => void) {
        this.isLoading = true
        try {
            tryContent()
        } catch (error) {
            console.log(error)
        } finally {
            this.isLoading = false
        }
    }
}