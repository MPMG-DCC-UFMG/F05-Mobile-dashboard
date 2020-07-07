import {action, observable, runInAction} from "mobx";
import {TypeWork} from "../models/TypeWork";

import {TypeWorkService} from "../services/TypeWorkService";

export class TypeWorkStore {

    private fullTypeWorksList: TypeWork[] = [];

    @observable typeWorksList: TypeWork[] = [];
    @observable isLoading = false;
    @observable selectedTypeWork?: TypeWork = undefined

    @action
    async loadTypeWorkList() {
        this.isLoading = true
        try {
            const typeWorks = await TypeWorkService.loadTypeWorks()
            runInAction(() => {
                    this.fullTypeWorksList = typeWorks;
                    this.search("")
                }
            )
        } catch (error) {
            console.log(error)
        } finally {
            this.isLoading = false
        }
    }

    @action
    search(query?: string) {
        if (!query || /^\s*$/.test(query)) {
            this.typeWorksList = this.fullTypeWorksList
        } else {
            this.typeWorksList = this.fullTypeWorksList.filter(item => item.name.includes(query))
        }
    }

    @action
    selectTypeWork(typeWork?: TypeWork) {
        this.selectedTypeWork = typeWork
    }

}