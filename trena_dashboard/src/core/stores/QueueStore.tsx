import {BaseStore} from "./BaseStore";
import {action, observable, runInAction} from "mobx";
import {QueueItem} from "../models/QueueItem";
import {QueueService} from "../network/services/QueueService";
import {Collect} from "../models/Collect";

export class QueueStore extends BaseStore {
    private fullQueueItemList: QueueItem[] = [];

    @observable queueItemList: QueueItem[] = [];
    @observable selectedQueueItem?: QueueItem = undefined
    @observable collectsOfPublicWork: Collect[] = []
    @observable selectedCollect?: Collect = undefined

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
    selectCollect(collect?: Collect) {
        this.selectedCollect = collect
    }

    @action
    selectQueueItem(queueItem?: QueueItem) {
        this.selectedQueueItem = queueItem
        if (queueItem) {
            this.getCollectOfPublicWork(queueItem?.public_work.id)
        } else {
            this.selectedCollect = undefined
        }
    }

    @action
    getCollectOfPublicWork(publicWorkId: string) {
        this.baseCall(async () => {
            const collects = await QueueService.getCollects(publicWorkId)
            runInAction(() => {
                this.collectsOfPublicWork = collects;
            })
        })
    }
}