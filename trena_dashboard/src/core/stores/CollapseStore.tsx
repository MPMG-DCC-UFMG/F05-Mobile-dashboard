import { action, observable } from "mobx";

export class CollapseStore {
  @observable workConfig = false;
  @observable trena = false;

  @action
  toggleWorkConfiguration() {
    this.workConfig = !this.workConfig;
  }

  @action
  toggleTrena() {
    this.trena = !this.trena;
  }

  @action
  toggleAppBar() {
    this.workConfig = !this.workConfig;
    this.trena = !this.trena;
  }
}
