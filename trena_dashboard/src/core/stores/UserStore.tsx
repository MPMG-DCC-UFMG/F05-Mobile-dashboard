import {BaseStore} from "./BaseStore";
import {action, observable, runInAction} from "mobx";
import {User} from "../models/User";
import {SecurityService} from "../services/SecurityService";

export class UserStore extends BaseStore {

    @observable loggedUser?: User = undefined

    @action
    async login(email: string, password: string) {
        this.baseCall(async () => {
            const token = await SecurityService.login(email, password)
            runInAction(() => {
                if (token) {
                    this.loggedUser = {email: email, token: token}
                }
            })
        })
    }

    @action
    async logout() {
        this.loggedUser = undefined
    }

}