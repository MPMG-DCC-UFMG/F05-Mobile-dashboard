import {action, observable, runInAction} from "mobx";
import {TypeWork} from "../models/TypeWork";

import {TypeWorkService} from "../services/TypeWorkService";

export class TypeWorkStore {

    private fullTypeWorksList: TypeWork[] = [];

    @observable typeWorksList: TypeWork[] = [];
    @observable isLoading = true;

    @action
    async loadTypeWorkList() {
        try {
            const typeWorks = await TypeWorkService.loadTypeWorks()
            runInAction(() => {
                    this.fullTypeWorksList = typeWorks;
                    this.search("")
                }
            )
        } catch (error) {
        }
    }

    @action
    search(query?: string) {
        if (!query || /^\s*$/.test(query)) {
            this.typeWorksList = this.fullTypeWorksList
        } else {
            this.typeWorksList = this.fullTypeWorksList.filter(item => item.name.startsWith(query))
        }
    }

}