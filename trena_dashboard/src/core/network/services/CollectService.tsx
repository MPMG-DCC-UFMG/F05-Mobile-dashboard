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

    static async downloadJSONReport(publicWorkId: string) {
        const call = Config.BASE_URL + "/collects/report/json/file"
        network.get(call)
            .responseType('blob')
            .query({public_work_id: publicWorkId}).then(res => {
            const data: Blob = res.body
            this.saveData(data, publicWorkId)
        })
    }

    private static saveData = (data: Blob, filename: string = "filename") => {
        const csvURL = window.URL.createObjectURL(data);
        let tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', filename + '.json');
        tempLink.click();
    }

}