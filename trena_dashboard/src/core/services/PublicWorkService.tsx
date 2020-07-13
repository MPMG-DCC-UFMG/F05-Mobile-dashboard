import {PublicWork} from "../models/PublicWork";
import Config from "../../config/Config";
import request from "superagent";

export class PublicWorkService {
    static async loadPublicWorks(): Promise<PublicWork[]> {
        const call = Config.BASE_URL + "/publicworks/"
        return request.get(call)
            .then(res => {
                let listPublicWorks: PublicWork[] = res.body

                return listPublicWorks
            })
    }

    static async deletePublicWork(publicWorkId: string) {
        const call = Config.BASE_URL + "/publicworks/delete"
        request.post(call)
            .type('application/json')
            .query({public_work_id: publicWorkId})
            .then(res => {
                if (res.ok) {
                    this.loadPublicWorks()
                }
            }).catch(err => {
            console.log(err)
        });
    }
}