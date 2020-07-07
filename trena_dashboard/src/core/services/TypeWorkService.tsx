import request from "superagent";
import Config from "../../config/Config";

import {TypeWork} from "../models/TypeWork"

export class TypeWorkService {

    static async loadTypeWorks(): Promise<TypeWork[]> {
        const call = Config.BASE_URL + "/typeworks/"
        return request.get(call)
            .then(res => {
                let listOfTypeWorks: TypeWork[] = res.body

                return listOfTypeWorks
            })
    }
}
