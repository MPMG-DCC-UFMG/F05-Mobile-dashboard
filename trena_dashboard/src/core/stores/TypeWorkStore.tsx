import {action, observable, runInAction} from "mobx";
import {TypeWork} from "../models/TypeWork";

import {TypeWorkService} from "../services/TypeWorkService";

export class TypeWorkStore {

    @observable typeWorksList: TypeWork[] = [];
    @observable isLoading = true;

    @action
    async loadTypeWorkList() {
        try {
            const typeWorks = await TypeWorkService.loadTypeWorks()
            runInAction(() => {
                    this.typeWorksList = typeWorks
                }
            )
        }catch (error){
        }
    }

}