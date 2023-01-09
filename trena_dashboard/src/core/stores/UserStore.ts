import { action, observable } from "mobx";

export type LoggedUser = {
  name: string;
  email: string;
  role: string;
};

export class UserStore {
  @observable loggedUser = {} as LoggedUser;

  @action
  updateLoggedUser(user: LoggedUser) {
    this.loggedUser = user;
  }
}
