import Config from "../../../config/Config";

import {TypeWork} from "../../models/TypeWork"
import {network} from "../NetworkInterceptor";

export class TypeWorkService {

    static async loadTypeWorks(): Promise<TypeWork[]> {
        const call = Config.BASE_URL + "/typeworks/"
        return network.get(call)
            .then(res => {
                let listOfTypeWorks: TypeWork[] = res.body

                return listOfTypeWorks
            })
    }

    static async deleteTypeWork(typeWorkFlag: number) {
        const call = Config.BASE_URL + "/typeworks/delete"
        network.post(call)
            .type('application/json')
            .query({type_work_id: typeWorkFlag})
            .then().catch(err => {
            console.log(err)
        });
    }

    static async addTypeWork(typeWork: TypeWork) {
        const call = Config.BASE_URL + "/typeworks/add"
        network.post(call)
            .type('application/json')
            .send(typeWork)
            .then().catch(err => {
            console.log(err)
        });
    }

    static async updateTypeWork(typeWork: TypeWork) {
        const call = Config.BASE_URL + "/typeworks/update"
        network.put(call)
            .type('application/json')
            .send(typeWork)
            .then().catch(err => {
            console.log(err)
        });
    }

}
