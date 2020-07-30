import Config from "../../config/Config";
import request from "superagent";

export class SecurityService {
    static async login(email: string, password: string): Promise<string> {
        const call = Config.BASE_URL + "/security/token"
        return request.post(call)
            .set('accept', 'application/json')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ grant_type: "",username: email, password: password, scope: "", client_id: "", client_secret: ""})
            .then(res => {
                let accessToken: string = res.body["access_token"]

                return accessToken
            })
    }
}