import {Collect} from "../../models/Collect";
import Config from "../../../config/Config";
import {network} from "../NetworkInterceptor";

export class CollectService {

    static async loadPublicWorkCollects(publicWorkId: string): Promise<Collect[]> {
        const call = Config.BASE_URL + "/collects/publicWork"
        return network.get(call)
            .query({public_work_id: publicWorkId})
            .then(res => {
                let listCollects: Collect[] = res.body

                return listCollects
            })
    }

    static async collectMonthCount(): Promise<number> {
        const call = Config.BASE_URL + "/collects/month/count"
        return network.get(call).then(res => {
            let collectCount: number = res.body

            return collectCount
        })
    }
}