import {Address} from "../../models/Address";
import Config from "../../../config/Config";
import TrenaAPI from "../TrenaAPI";

export class LocationService {
    static async queryCEPTrena(cep: string): Promise<Address> {
        const call = Config.BASE_URL + "/address/by_cep/"
        return TrenaAPI.network().get(call).query({cep: cep}).then(res => {
                return res.body
            }
        )
    }
}