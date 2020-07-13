import request from "superagent";

export class LocationService {
    static async queryCEP(cep: string): Promise<request.Response> {
        const mCep = cep.replace(/\D/g, '');
        const call = "https://viacep.com.br/ws/" + mCep + "/json/"
        return request.get(call).then()
    }
}