import request from "superagent";
import Config from "../../config/Config";

export default class TrenaAPI {
  private static instance: TrenaAPI;

  private constructor() {}

  public static getInstance(): TrenaAPI {
    if (!TrenaAPI.instance) {
      TrenaAPI.instance = new TrenaAPI();
    }
    return TrenaAPI.instance;
  }

  private _userToken: string = "";

  public setUserToken(token: string) {
    this._userToken = token;
  }

  public static network = () => {
    return request.agent().set({
      "X-TRENA-KEY": Config.API_KEY,
      token: TrenaAPI.getInstance()._userToken,
    });
  };
}
