import {action, observable} from "mobx";
import {BaseActionView} from "../../screens/components/base/BaseActionView";

export class ViewStore {

    @observable viewInModal?: BaseActionView<any, any> = undefined

    @action
    setViewInModal(viewInModal?: any) {
        this.viewInModal = viewInModal
    }
}