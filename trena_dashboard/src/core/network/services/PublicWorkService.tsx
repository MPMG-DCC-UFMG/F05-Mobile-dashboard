import {PublicWork} from "../../models/PublicWork";
import Config from "../../../config/Config";
import {network} from "../NetworkInterceptor";

export class PublicWorkService {
    static async loadPublicWorks(): Promise<PublicWork[]> {
        const call = Config.BASE_URL + "/publicworks/"
        return network.get(call)
            .then(res => {
                let listPublicWorks: PublicWork[] = res.body

                return listPublicWorks
            })
    }

    static async deletePublicWork(publicWorkId: string) {
        const call = Config.BASE_URL + "/publicworks/delete"
        network.post(call)
            .type('application/json')
            .query({public_work_id: publicWorkId})
            .then().catch(err => {
            console.log(err)
        });
    }

    static async addPublicWork(publicWork: PublicWork) {
        const call = Config.BASE_URL + "/publicworks/add"
        network.post(call).type('application/json').send(publicWork).then().catch(err => {
            console.log(err)
        })
    }

    static async updatePublicWork(publicWork: PublicWork) {
        const call = Config.BASE_URL + "/publicworks/update"
        network.put(call).type('application/json').send(publicWork).then().catch(err => {
            console.log(err)
        })
    }

    static async countPublicWork(): Promise<number> {
        const call = Config.BASE_URL + "/publicworks/count"
        return network.get(call).then(res => {
            let publicWorkCount: number = res.body

            return publicWorkCount
        })
    }
}