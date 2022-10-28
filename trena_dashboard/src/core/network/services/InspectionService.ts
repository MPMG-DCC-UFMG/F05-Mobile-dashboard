import Config from "../../../config/Config";
import { Inspection } from "../../models/Inspection";
import TrenaAPI from "../TrenaAPI";

export class InspectionService {
  static async loadInspections(): Promise<Inspection[]> {
    const call = Config.BASE_URL + "/inspections/";
    return TrenaAPI.network()
      .get(call)
      .then((res) => {
        let inspections: Inspection[] = res.body;
        return inspections;
      });
  }

  static async getPublicWorkInspections(publicWorkId: string) {
    const call = Config.BASE_URL + "/inspections/publicwork/" + publicWorkId;
    return TrenaAPI.network().get(call).type("application/json");
  }

  static async addInspection(inspection: Inspection) {
    const call = Config.BASE_URL + "/inspections/add";
    TrenaAPI.network()
      .post(call)
      .type("application/json")
      .send(inspection)
      .then()
      .catch((err) => {
        console.log(err);
      });
  }

  static async updateInspection(inspection: Inspection) {
    const call = Config.BASE_URL + "/inspections/update";
    TrenaAPI.network()
      .put(call)
      .type("application/json")
      .send(inspection)
      .then()
      .catch((err) => {
        console.log(err);
      });
  }
}

const loadInspections = async () => {
  const call = Config.BASE_URL + "/inspections/";
  const res = await TrenaAPI.network().get(call);
  return res.body;
};

const getPublicWorkInspections = async (publicWorkId: string) => {
  const call = Config.BASE_URL + "/inspections/publicwork/" + publicWorkId;
  const res = await TrenaAPI.network().get(call).type("application/json");
  return res.body;
};

const addInspection = async (inspection: Inspection) => {
  const call = Config.BASE_URL + "/inspections/add";
  const res = await TrenaAPI.network()
    .post(call)
    .type("application/json")
    .send(inspection);
  return res.body;
};

const updateInspection = async (inspection: Inspection) => {
  const call = Config.BASE_URL + "/inspections/update";
  const res = await TrenaAPI.network()
    .put(call)
    .type("application/json")
    .send(inspection);
  return res.body;
};

export const InspectionServiceQuery = {
  loadInspections,
  getPublicWorkInspections,
  addInspection,
  updateInspection,
};
