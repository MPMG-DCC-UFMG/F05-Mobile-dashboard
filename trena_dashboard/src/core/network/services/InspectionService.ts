import Config from "../../../config/Config";
import { CreateInspectionDTO } from "../../models/dto/CreateInspectionDTO";
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
  const role = localStorage.getItem("ROLE")!;
  const isUserAdmin = role === "ADMIN" || role === "interno"!;
  let call = Config.BASE_URL + "/inspections/";

  if (!isUserAdmin) {
    call += "/public";
  }

  const res = await TrenaAPI.network().get(call);
  return res.body;
};

const countMpInspections = async () => {
  const call = Config.BASE_URL + "/inspections/count";
  const res = await TrenaAPI.network().get(call);
  return res.body;
};

const getPublicWorkInspections = async (publicWorkId: string) => {
  const call = Config.BASE_URL + "/inspections/publicwork/" + publicWorkId;
  const res = await TrenaAPI.network().get(call).type("application/json");
  return res.body;
};

const addInspection = async (inspection: CreateInspectionDTO) => {
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

const getInspectionCollects = async (inspection_flag: number) => {
  const call = Config.BASE_URL + `/inspections/collect/${inspection_flag}`;
  const res = await TrenaAPI.network().get(call);

  return res.body;
};

const getInspectionReport = async (inspectionFlag: number) => {
  const call = Config.BASE_URL + `/inspections/report/${inspectionFlag}`;
  const res = await TrenaAPI.network().get(call).responseType("blob");

  const url = window.URL.createObjectURL(res.body);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `relatorio-automatico-vistoria${inspectionFlag}`;
  anchor.click();
  anchor.remove();
};

export const InspectionServiceQuery = {
  loadInspections,
  countMpInspections,
  getPublicWorkInspections,
  getInspectionCollects,
  addInspection,
  updateInspection,
  getInspectionReport,
};
