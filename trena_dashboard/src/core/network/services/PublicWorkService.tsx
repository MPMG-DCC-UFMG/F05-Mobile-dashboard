import {PublicWork} from "../../models/PublicWork";
import Config from "../../../config/Config";
import TrenaAPI from "../TrenaAPI";

export class PublicWorkService {
    static async loadPublicWorks(): Promise<PublicWork[]> {
        const call = Config.BASE_URL + "/publicworks/"
        return TrenaAPI.network().get(call)
            .then(res => {
                let listPublicWorks: PublicWork[] = res.body

                console.log(listPublicWorks)
                return listPublicWorks
            })
    }

    static async deletePublicWork(publicWorkId: string) {
        const call = Config.BASE_URL + "/publicworks/delete"
        TrenaAPI.network().post(call)
            .type('application/json')
            .query({public_work_id: publicWorkId})
            .then().catch(err => {
            console.log(err)
        });
    }

    static async addPublicWork(publicWork: PublicWork) {
        const call = Config.BASE_URL + "/publicworks/add"
        TrenaAPI.network().post(call).type('application/json').send(publicWork).then().catch(err => {
            console.log(err)
        })
    }

    static async updatePublicWork(publicWork: PublicWork) {
        const call = Config.BASE_URL + "/publicworks/update"
        TrenaAPI.network().put(call).type('application/json').send(publicWork).then().catch(err => {
            console.log(err)
        })
    }

    static async countPublicWork(): Promise<number> {
        const call = Config.BASE_URL + "/publicworks/count"
        return TrenaAPI.network().get(call).then(res => {
            let publicWorkCount: number = res.body

            return publicWorkCount
        })
    }
}