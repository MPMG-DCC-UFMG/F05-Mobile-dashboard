import {observable} from "mobx";

export abstract class BaseStore {

    @observable isLoading = false;

    baseCall(tryContent: () => void) {
        this.isLoading = true
        try {
            tryContent()
        } catch (error) {
            console.log(error)
        } finally {
            this.isLoading = false
        }
    }
}