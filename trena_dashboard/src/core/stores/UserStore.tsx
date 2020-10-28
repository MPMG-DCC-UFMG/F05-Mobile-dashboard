import {BaseStore} from "./BaseStore";
import {action, observable, runInAction} from "mobx";
import {User} from "../models/User";
import {SecurityService} from "../network/services/SecurityService";

export class UserStore extends BaseStore {

    @observable loggedUser?: User = undefined
    @observable userCreated: boolean = false
    @observable usersList: string[] = []

    @action
    async login(email: string, password: string) {
        this.baseCall(async () => {
            SecurityService.login(email, password).then(token => {
                runInAction(() => {
                    if (token) {
                        this.loggedUser = {email: email, token: token}
                    }
                })
            }).catch(res => {
                console.log(res)
            })
        })
    }

    @action
    async logout() {
        this.loggedUser = undefined
    }

    @action
    async createUser(email: string, password: string) {
        this.baseCall(async () => {
            const response = await SecurityService.createUser(email, password)
            if (response.success) {
                runInAction(() => {
                    this.userCreated = true
                    this.loadUsers()
                })
            }
        })
    }

    @action
    async loadUsers() {
        this.baseCall(async () => {
            const users = await SecurityService.loadUsersList()
            runInAction(() => {
                    this.usersList = users;
                }
            )
        })
    }

    @action
    async deleteUser(username: string) {
        this.baseCall(async () => {
            const response = await SecurityService.deleteUser(username)
            if (response.success) {
                runInAction(() => {
                    this.loadUsers()
                })
            }
        })
    }

}