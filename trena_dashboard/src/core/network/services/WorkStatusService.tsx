import Config from "../../../config/Config";
import {network} from "../NetworkInterceptor";
import {WorkStatus} from "../../models/WorkStatus";

export class WorkStatusService {
    static async loadWorkStatus(): Promise<WorkStatus[]> {
        const call = Config.BASE_URL + "/workstatus/"
        return network.get(call)
            .then(res => {
                let listOfWorkStatus: WorkStatus[] = res.body

                return listOfWorkStatus
            })
    }
}