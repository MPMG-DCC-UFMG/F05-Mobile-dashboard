import Config from "../../../config/Config";
import {network} from "../NetworkInterceptor";
import {MPResponse} from "../models/Response";

export class SecurityService {
    static async login(email: string, password: string): Promise<string> {
        const call = Config.BASE_URL + "/security/token"
        return network.post(call)
            .set({'Content-Type': 'application/x-www-form-urlencoded', 'accept': 'application/json'})
            .send({grant_type: "", username: email, password: password, scope: "", client_id: "", client_secret: ""})
            .then(res => {
                let accessToken: string = res.body["access_token"]

                return accessToken
            })
    }

    static async createUser(email: string, password: string): Promise<MPResponse> {
        const call = Config.BASE_URL + "/security/users/create"
        return network.post(call)
            .send({email: email, authentication: password, full_name: ""})
            .then(res => {
                let response: MPResponse = res.body
                return response
            })
    }

    static async loadUsersList(): Promise<string[]> {
        const call = Config.BASE_URL + "/security/users"
        return network.get(call).then(res => {
            let users: string[] = res.body

            return users
        })
    }

    static async deleteUser(email: string): Promise<MPResponse> {
        const call = Config.BASE_URL + "/security/users/delete"
        return network.post(call)
            .type('application/json')
            .query({email: email})
            .then(res => {
                let response: MPResponse = res.body
                return response
            })
    }

}