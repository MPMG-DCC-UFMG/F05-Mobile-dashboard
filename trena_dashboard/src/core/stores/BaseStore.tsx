// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { observable } from "mobx";

export abstract class BaseStore {
  @observable isLoading = false;

  protected baseCall(tryContent: () => void) {
    this.isLoading = true;
    try {
      tryContent();
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }
}
