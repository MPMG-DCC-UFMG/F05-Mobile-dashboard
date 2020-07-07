import {PublicWork} from "../models/PublicWork";
import Config from "../../config/Config";
import request from "superagent";

export class PublicWorkService {
    static async loadPublicWorks(): Promise<PublicWork[]> {
        const call = Config.BASE_URL + "/publicworks"
        return request.get(call)
            .then(res => {
                let listPublicWorks: PublicWork[] = res.body

                return listPublicWorks
            })
    }
}