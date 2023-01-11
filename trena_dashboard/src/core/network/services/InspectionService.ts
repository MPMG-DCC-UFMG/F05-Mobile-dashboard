import { QueryFunctionContext } from "react-query";
import Config from "../../../config/Config";
import { Collect } from "../../models/Collect";
import { CreateInspectionDTO } from "../../models/dto/CreateInspectionDTO";
import { Inspection } from "../../models/Inspection";
import TrenaAPI from "../TrenaAPI";

async function loadInspections(): Promise<Inspection[]> {
  const role = localStorage.getItem("ROLE")!;
  const isUserAdmin = role === "ADMIN" || role === "interno"!;
  let call = Config.BASE_URL + "/inspections/";

  if (!isUserAdmin) {
    call += "/public";
  }

  const res = await TrenaAPI.network().get(call);
  return res.body;
}

async function countMpInspections(): Promise<number> {
  const call = Config.BASE_URL + "/inspections/count";
  const res = await TrenaAPI.network().get(call);
  return res.body;
}

async function getPublicWorkInspections(
  ctx: QueryFunctionContext
): Promise<Inspection[]> {
  const [, publicWorkId] = ctx.queryKey;

  const call = Config.BASE_URL + "/inspections/publicwork/" + publicWorkId;
  const res = await TrenaAPI.network().get(call).type("application/json");
  return res.body;
}

async function addInspection(
  inspection: CreateInspectionDTO
): Promise<Inspection> {
  const call = Config.BASE_URL + "/inspections/add";
  const res = await TrenaAPI.network()
    .post(call)
    .type("application/json")
    .send(inspection);
  return res.body;
}

async function updateInspection(inspection: Inspection): Promise<Inspection> {
  const call = Config.BASE_URL + "/inspections/update";
  const res = await TrenaAPI.network()
    .put(call)
    .type("application/json")
    .send(inspection);
  return res.body;
}

async function getInspectionCollects(
  ctx: QueryFunctionContext
): Promise<Collect[]> {
  const [, inspectionFlag] = ctx.queryKey;
  const call = Config.BASE_URL + `/inspections/collect/${inspectionFlag}`;
  const res = await TrenaAPI.network().get(call);

  return res.body;
}

async function getInspectionReport(inspectionFlag: number): Promise<void> {
  const call = Config.BASE_URL + `/inspections/report/${inspectionFlag}`;
  const res = await TrenaAPI.network().get(call).responseType("blob");

  const url = window.URL.createObjectURL(res.body);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `relatorio-automatico-vistoria${inspectionFlag}`;
  anchor.click();
  anchor.remove();
}

async function getInspectionDocx(inspectionFlag: number): Promise<void> {
  const call = `${Config.BASE_URL}/inspections/reportDocx/${inspectionFlag}`;
  const res = await TrenaAPI.network().get(call).responseType("blob");

  const url = window.URL.createObjectURL(res.body);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `relatorio-automatico-vistoria-editavel-${inspectionFlag}.docx`;
  anchor.click();
  anchor.remove();
}

export const InspectionServiceQuery = {
  loadInspections,
  countMpInspections,
  getPublicWorkInspections,
  getInspectionCollects,
  addInspection,
  updateInspection,
  getInspectionReport,
  getInspectionDocx,
};
