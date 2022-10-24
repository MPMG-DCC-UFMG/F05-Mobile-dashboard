import { action, observable } from "mobx";
import { BaseActionView } from "../../components/Base/BaseActionView";

export class ViewStore {
  @observable viewInModal?: BaseActionView<any, any> = undefined;

  @action
  setViewInModal(viewInModal?: any) {
    this.viewInModal = viewInModal;
  }
}
