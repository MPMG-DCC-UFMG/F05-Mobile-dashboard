import {BaseStore} from "./BaseStore";
import {action, observable, runInAction} from "mobx";
import {QueueItem} from "../models/QueueItem";
import {QueueService} from "../network/services/QueueService";

export class QueueStore extends BaseStore {
    private fullQueueItemList: QueueItem[] = [];

    @observable queueItemList: QueueItem[] = [];
    @observable selectedQueueItem?: QueueItem = undefined

    @action
    async loadQueueItem() {
        this.baseCall(async () => {
            const queueItems = await QueueService.loadQueueItems()
            runInAction(() => {
                this.fullQueueItemList = queueItems;
                this.search("")
            })
        })
    }

    @action
    search(query?: string) {
        this.queueItemList = this.fullQueueItemList
    }

    @action
    selectQueueItem(queueItem?: QueueItem){
        this.selectedQueueItem = queueItem
    }
}