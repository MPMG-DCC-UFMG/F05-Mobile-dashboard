import Config from "../../../config/Config";
import { LoginUser } from "../../../screens/LoginScreen";
import { CreateUserDTO } from "../../models/dto/user/CreateUserDTO";
import { UserSafeDataDTO } from "../../models/dto/user/UserSafeDataDTO";
import { User } from "../../models/User";
import { MPResponse } from "../models/Response";
import TrenaAPI from "../TrenaAPI";

export type LoggedUserResponse = {
  email: string;
  authentication: string;
  full_name: string;
  picture: string;
  role: string;
};

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
        localStorage.setItem("TOKEN", accessToken);
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

const login = async (user: LoginUser) => {
  const call = Config.BASE_URL + "/security/users/login";
  const { username, password } = user;

  const res = await TrenaAPI.network()
    .post(call)
    .set({
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "application/json",
    })
    .send({
      grant_type: "",
      username: username,
      password: password,
      scope: "",
      client_id: "",
      client_secret: "",
    });

  if (res.status === 401) {
    throw new Error("Usuário não possui acesso ao painel");
  }

  if (res.status === 500) {
    throw new Error("O Servidor encontra-se offline!");
  }

  const accessToken = res.body["access_token"];
  const role = res.body["role"];
  localStorage.setItem("TOKEN", accessToken);
  localStorage.setItem("ROLE", role);

  if (role === "ADMIN" || role === "interno") {
    TrenaAPI.getInstance().setUserToken(accessToken);
    return { email: username, token: accessToken, role: role };
  } else {
    throw new Error("Usuário não possui acesso ao painel");
  }
};

const createUser = async (user: CreateUserDTO) => {
  const call = Config.BASE_URL + "/security/users/create";
  const { name, password, email } = user;

  const res = await TrenaAPI.network()
    .post(call)
    .send({ email, authentication: password, full_name: name });

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

const getLoggedUser = async (): Promise<LoggedUserResponse> => {
  const call = Config.BASE_URL + "/security/users/me";
  const token = localStorage.getItem("TOKEN");
  const res = await TrenaAPI.network()
    .get(call)
    .type("application/json")
    .query({ token: token });

  return res.body;
};

const getUserSafeData = async (
  user_email: string
): Promise<UserSafeDataDTO> => {
  const call = `${Config.BASE_URL}/security/users/${user_email}`;
  const res = await TrenaAPI.network().get(call);

  return res.body;
};

const loadUserListSafe = async (): Promise<UserSafeDataDTO[]> => {
  const call = `${Config.BASE_URL}/security/users/all`;
  const res = await TrenaAPI.network().get(call);

  return res.body;
};

export const SecurityServiceQuery = {
  login,
  loadUsersList,
  loadUserListSafe,
  getLoggedUser,
  getUserSafeData,
  createUser,
  deleteUser,
};
