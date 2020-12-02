import Config from "../../../config/Config";
import TrenaAPI from "../TrenaAPI";
import {QueueItem} from "../../models/QueueItem";

export class QueueService {

    static async countQueue(): Promise<number> {
        const call = Config.BASE_URL + "/queue/count"
        return TrenaAPI.network().get(call).then(res => {
            let queueCount: number = res.body

            return queueCount
        })
    }

    static async loadQueueItems(): Promise<QueueItem[]> {
        const call = Config.BASE_URL + "/queue/items"
        return TrenaAPI.network().get(call).then(res => {
            let items: QueueItem[] = res.body
            return items
        })
    }
}