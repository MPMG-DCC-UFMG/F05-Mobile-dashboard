import { action, observable } from "mobx";

export class CollapseStore {
  @observable workConfig = false;
  @observable trena = false;
  @observable publicWork = false;
  @observable chat = false;

  @action
  toggleWorkConfiguration() {
    this.workConfig = !this.workConfig;
  }

  @action
  toggleTrena() {
    this.trena = !this.trena;
  }

  @action
  togglePublicWork() {
    this.publicWork = !this.publicWork;
  }

  @action
  toggleAppBar() {
    this.workConfig = !this.workConfig;
    this.trena = !this.trena;
  }

  @action
  toggleChat() {
    this.chat = !this.chat;
  }
}
