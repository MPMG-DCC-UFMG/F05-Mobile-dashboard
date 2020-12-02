import Config from "../../../config/Config";
import {MPResponse} from "../models/Response";
import TrenaAPI from "../TrenaAPI";
import {User} from "../../models/User";

export class SecurityService {
    static async login(email: string, password: string): Promise<User> {
        const call = Config.BASE_URL + "/security/users/login"
        return TrenaAPI.network().post(call)
            .set({'Content-Type': 'application/x-www-form-urlencoded', 'accept': 'application/json'})
            .send({grant_type: "", username: email, password: password, scope: "", client_id: "", client_secret: ""})
            .then(res => {
                let accessToken: string = res.body["access_token"]
                let role: string = res.body["role"]

                if (role !== "ADMIN") {
                    throw new Error("Usuário não tem acesso ao painel")
                } else {
                    TrenaAPI.getInstance().setUserToken(accessToken)
                    return {email: email, token: accessToken, role: role}
                }
            })
    }

    static async createUser(email: string, password: string): Promise<MPResponse> {
        const call = Config.BASE_URL + "/security/users/create"
        return TrenaAPI.network().post(call)
            .send({email: email, authentication: password, full_name: ""})
            .then(res => {
                let response: MPResponse = res.body
                return response
            })
    }

    static async loadUsersList(): Promise<User[]> {
        const call = Config.BASE_URL + "/security/users"
        return TrenaAPI.network().get(call).then(res => {
            let users: User[] = res.body

            return users
        })
    }

    static async deleteUser(email: string): Promise<MPResponse> {
        const call = Config.BASE_URL + "/security/users/delete"
        return TrenaAPI.network().post(call)
            .type('application/json')
            .query({email: email})
            .then(res => {
                let response: MPResponse = res.body
                return response
            })
    }

}