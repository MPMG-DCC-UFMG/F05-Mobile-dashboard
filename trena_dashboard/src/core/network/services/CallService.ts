import Config from "../../../config/Config";
import { Call } from "../../models/Call";
import { OpenCallDTO } from "../../models/dto/OpenCallDTO";
import TrenaAPI from "../TrenaAPI";

const baseUrl = Config.BASE_URL + "/call";

const getAllCalls = async (): Promise<Call[]> => {
  const url = baseUrl;
  const res = await TrenaAPI.network().get(url);

  return res.body;
};

const openCall = async (call: OpenCallDTO): Promise<Call> => {
  const url = baseUrl;
  const res = await TrenaAPI.network().post(url).send(call);

  return res.body;
};

const getCallById = async (id: string): Promise<Call> => {
  const url = `${baseUrl}/${id}`;
  const res = await TrenaAPI.network().get(url);

  return res.body;
};

const closeCall = async (id: string): Promise<Call> => {
  const url = `${baseUrl}/${id}`;
  const res = await TrenaAPI.network().put(url);

  return res.body;
};

const deleteCall = async (id: string): Promise<Call> => {
  const url = `${baseUrl}/${id}`;
  const res = await TrenaAPI.network().delete(url);

  return res.body;
};

const getLoggedUserCalls = async (email: string): Promise<Call[]> => {
  const isAdmin = localStorage.getItem("ROLE") === "ADMIN";
  let url = "";

  if (isAdmin) {
    url = `${baseUrl}/admin/${email}`;
  } else {
    url = `${baseUrl}/user/${email}`;
  }

  const res = await TrenaAPI.network().get(url);

  return res.body;
};

const getLoggedUserCallsHistory = async (email: string): Promise<Call[]> => {
  const isAdmin = localStorage.getItem("ROLE") === "ADMIN";
  let url = "";

  if (isAdmin) {
    url = `${baseUrl}/admin/history/${email}`;
  } else {
    url = `${baseUrl}/user/history/${email}`;
  }

  const res = await TrenaAPI.network().get(url);

  return res.body;
};

export const CallServiceQuery = {
  getAllCalls,
  openCall,
  getCallById,
  closeCall,
  deleteCall,
  getLoggedUserCalls,
  getLoggedUserCallsHistory,
};
