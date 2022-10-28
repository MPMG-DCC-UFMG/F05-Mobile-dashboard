import Config from "../../../config/Config";
import { User } from "../../models/User";
import { MPResponse } from "../models/Response";
import TrenaAPI from "../TrenaAPI";

export class SecurityService {
  static async login(email: string, password: string): Promise<User> {
    const call = Config.BASE_URL + "/security/users/login";
    return TrenaAPI.network()
      .post(call)
      .set({
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      })
      .send({
        grant_type: "",
        username: email,
        password: password,
        scope: "",
        client_id: "",
        client_secret: "",
      })
      .then((res) => {
        let accessToken: string = res.body["access_token"];
        let role: string = res.body["role"];

        if (role !== "ADMIN") {
          throw new Error("Usuário não tem acesso ao painel");
        } else {
          TrenaAPI.getInstance().setUserToken(accessToken);
          return { email: email, token: accessToken, role: role };
        }
      });
  }

  static async createUser(
    email: string,
    password: string
  ): Promise<MPResponse> {
    const call = Config.BASE_URL + "/security/users/create";
    return TrenaAPI.network()
      .post(call)
      .send({ email: email, authentication: password, full_name: "" })
      .then((res) => {
        let response: MPResponse = res.body;
        return response;
      });
  }

  static async loadUsersList(): Promise<User[]> {
    const call = Config.BASE_URL + "/security/users";
    return TrenaAPI.network()
      .get(call)
      .then((res) => {
        let users: User[] = res.body;

        return users;
      });
  }

  static async deleteUser(email: string): Promise<MPResponse> {
    const call = Config.BASE_URL + "/security/users/delete";
    return TrenaAPI.network()
      .post(call)
      .type("application/json")
      .query({ email: email })
      .then((res) => {
        let response: MPResponse = res.body;
        return response;
      });
  }
}

const login = async (email: string, password: string) => {
  const call = Config.BASE_URL + "/security/users/login";
  const res = await TrenaAPI.network()
    .post(call)
    .set({
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "application/json",
    })
    .send({
      grant_type: "",
      username: email,
      password: password,
      scope: "",
      client_id: "",
      client_secret: "",
    });

  const accessToken = res.body["access_token"];
  const role = res.body["role"];

  role !== "ADMIN"
    ? () => {
        throw new Error("Usuário não tem acesso ao painel");
      }
    : () => {
        TrenaAPI.getInstance().setUserToken(accessToken);
        return { email: email, token: accessToken, role: role };
      };
};

const createUser = async (email: string, password: string) => {
  const call = Config.BASE_URL + "/security/users/create";
  const res = await TrenaAPI.network()
    .post(call)
    .send({ email: email, authentication: password, full_name: "" });

  return res.body;
};

const loadUsersList = async () => {
  const call = Config.BASE_URL + "/security/users";
  const res = await TrenaAPI.network().get(call);

  return res.body;
};

const deleteUser = async (email: string) => {
  const call = Config.BASE_URL + "/security/users/delete";
  const res = await TrenaAPI.network()
    .post(call)
    .type("application/json")
    .query({ email: email });

  return res.body;
};

export const SecurityServiceQuery = {
  login,
  loadUsersList,
  createUser,
  deleteUser,
};
