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

    static async deleteWorkStatus(workStatusFlag: number) {
        const call = Config.BASE_URL + "/workstatus/delete"
        network.post(call)
            .type('application/json')
            .query({work_status_id: workStatusFlag})
            .then().catch(err => {
            console.log(err)
        });
    }

    static async addWorkStatus(workStatus: WorkStatus) {
        const call = Config.BASE_URL + "/workstatus/add"
        network.post(call)
            .type('application/json')
            .send(workStatus)
            .then().catch(err => {
            console.log(err)
        });
    }

    static async updateWorkStatus(workStatus: WorkStatus) {
        const call = Config.BASE_URL + "/workstatus/update"
        network.put(call)
            .type('application/json')
            .send(workStatus)
            .then().catch(err => {
            console.log(err)
        });
    }
}