import Config from "../../../config/Config";
import { WorkStatus } from "../../models/WorkStatus";
import TrenaAPI from "../TrenaAPI";

export class WorkStatusService {
  static async loadWorkStatus(): Promise<WorkStatus[]> {
    const call = Config.BASE_URL + "/workstatus/";
    return TrenaAPI.network()
      .get(call)
      .then((res) => {
        let listOfWorkStatus: WorkStatus[] = res.body;

        return listOfWorkStatus;
      });
  }

  static async deleteWorkStatus(workStatusFlag: number) {
    const call = Config.BASE_URL + "/workstatus/delete";
    TrenaAPI.network()
      .post(call)
      .type("application/json")
      .query({ work_status_id: workStatusFlag })
      .then()
      .catch((err) => {
        console.log(err);
      });
  }

  static async addWorkStatus(workStatus: WorkStatus) {
    const call = Config.BASE_URL + "/workstatus/add";
    TrenaAPI.network()
      .post(call)
      .type("application/json")
      .send(workStatus)
      .then()
      .catch((err) => {
        console.log(err);
      });
  }

  static async updateWorkStatus(workStatus: WorkStatus) {
    const call = Config.BASE_URL + "/workstatus/update";
    TrenaAPI.network()
      .put(call)
      .type("application/json")
      .send(workStatus)
      .then()
      .catch((err) => {
        console.log(err);
      });
  }
}

const loadWorkStatus = async () => {
  const call = Config.BASE_URL + "/workstatus/";
  const res = await TrenaAPI.network().get(call);

  return res.body;
};

const loadWorkStatusById = async (id: number) => {
  const call = Config.BASE_URL + "/workstatus/id";
  const res = await TrenaAPI.network().query({ work_status_id: id }).get(call);

  return res.body;
};

const deleteWorkStatus = async (workStatusFlag: number) => {
  const call = Config.BASE_URL + "/workstatus/delete";
  const res = await TrenaAPI.network()
    .post(call)
    .type("application/json")
    .query({ work_status_id: workStatusFlag });

  return res.body;
};

const addWorkStatus = async (workStatus: WorkStatus) => {
  const call = Config.BASE_URL + "/workstatus/add";
  const res = await TrenaAPI.network()
    .post(call)
    .type("application/json")
    .send(workStatus);

  return res.body;
};

const updateWorkStatus = async (workStatus: WorkStatus) => {
  const call = Config.BASE_URL + "/workstatus/update";
  const res = await TrenaAPI.network()
    .put(call)
    .type("application/json")
    .send(workStatus);

  return res.body;
};

export const WorkStatusServiceQuery = {
  loadWorkStatus,
  loadWorkStatusById,
  deleteWorkStatus,
  addWorkStatus,
  updateWorkStatus,
};

