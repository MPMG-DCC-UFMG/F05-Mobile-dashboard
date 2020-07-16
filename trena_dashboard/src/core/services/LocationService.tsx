import request from "superagent";
import {Address} from "../models/Address";
import Config from "../../config/Config";

export class LocationService {
    static async queryCEP(cep: string): Promise<request.Response> {
        const mCep = cep.replace(/\D/g, '');
        const call = "https://viacep.com.br/ws/" + mCep + "/json/"
        return request.get(call).then()
    }

    static async queryCEPTrena(cep: string): Promise<Address> {
        const call = Config.BASE_URL + "/address/by_cep/"
        return request.get(call).query({cep: cep}).then(res => {
                return res.body
            }
        )
    }
}