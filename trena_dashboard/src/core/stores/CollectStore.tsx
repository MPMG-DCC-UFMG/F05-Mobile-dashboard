import {BaseStore} from "./BaseStore";
import {action, observable, runInAction} from "mobx";
import {PaginatedResponse} from "../network/models/PaginatedResponse";
import {Collect} from "../models/Collect";
import {CollectService} from "../network/services/CollectService";

export class CollectStore extends BaseStore {

    @observable paginatedCollects?: PaginatedResponse<Collect> = undefined;
    @observable selectedCollect?: Collect = undefined
    private currPage: number = 1

    @action
    async loadCollects() {
        this.baseCall(async () => {
            const paginatedCollects = await CollectService.loadCollectsPaginated(this.currPage)
            runInAction(() => {
                this.paginatedCollects = paginatedCollects;
            })
        })
    }

    @action
    selectCollect(collect?: Collect) {
        this.selectedCollect = collect
    }
}