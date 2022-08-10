import {Inspection} from "../../models/Inspection";
import Config from "../../../config/Config";
import TrenaAPI from "../TrenaAPI";

export class InspectionService {

    static async loadInspections(): Promise<Inspection[]> {
        const call = Config.BASE_URL + "/inspections/"
        return TrenaAPI.network().get(call)
            .then(res => {
                let inspections: Inspection[] = res.body
                return inspections
            })
    }

    static async addInspection(inspection: Inspection) {
        const call = Config.BASE_URL + "/inspections/add"
        TrenaAPI.network().post(call)
            .type('application/json')
            .send(inspection)
            .then().catch(err => {
            console.log(err)
        });
    }

    static async updateInspection(inspection: Inspection) {
        const call = Config.BASE_URL + "/inspections/update"
        TrenaAPI.network().put(call)
            .type('application/json')
            .send(inspection)
            .then().catch(err => {
            console.log(err)
        });
    }

    
}