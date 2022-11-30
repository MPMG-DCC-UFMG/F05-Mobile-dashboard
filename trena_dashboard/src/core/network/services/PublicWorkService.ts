import Config from "../../../config/Config";
import { PublicWork } from "../../models/PublicWork";
import TrenaAPI from "../TrenaAPI";

export class PublicWorkService {
  static async loadPublicWorks(): Promise<PublicWork[]> {
    const call = Config.BASE_URL + "/publicworks/";
    return TrenaAPI.network()
      .get(call)
      .then((res) => {
        let listPublicWorks: PublicWork[] = res.body;

        console.log(listPublicWorks);
        return listPublicWorks;
      });
  }

  static async deletePublicWork(publicWorkId: string) {
    const call = Config.BASE_URL + "/publicworks/delete";
    TrenaAPI.network()
      .post(call)
      .type("application/json")
      .query({ public_work_id: publicWorkId })
      .then()
      .catch((err) => {
        console.log(err);
      });
  }

  static async addPublicWork(publicWork: PublicWork) {
    const call = Config.BASE_URL + "/publicworks/add";
    TrenaAPI.network()
      .post(call)
      .type("application/json")
      .send(publicWork)
      .then()
      .catch((err) => {
        console.log(err);
      });
  }

  static async updatePublicWork(publicWork: PublicWork) {
    const call = Config.BASE_URL + "/publicworks/update";
    TrenaAPI.network()
      .put(call)
      .type("application/json")
      .send(publicWork)
      .then()
      .catch((err) => {
        console.log(err);
      });
  }

  static async countPublicWork(): Promise<number> {
    const call = Config.BASE_URL + "/publicworks/count";
    return TrenaAPI.network()
      .get(call)
      .then((res) => {
        let publicWorkCount: number = res.body;

        return publicWorkCount;
      });
  }
}

const loadPublicWorks = async () => {
  const call = Config.BASE_URL + "/publicworks/";
  const res = await TrenaAPI.network().get(call);
  return res.body;
};

const deletePublicWork = async (publicWorkId: string) => {
  const call = Config.BASE_URL + "/publicworks/delete";
  const token = localStorage.getItem("TOKEN");
  const res = await TrenaAPI.network()

    .post(call)
    .type("application/json")
    .query({ public_work_id: publicWorkId, token: token });

  return res.body;
};

const addPublicWork = async (publicWork: PublicWork) => {
  const call = Config.BASE_URL + "/publicworks/add";
  const res = await TrenaAPI.network()
    .post(call)
    .type("application/json")
    .send(publicWork);

  return res.body;
};

const updatePublicWork = async (publicWork: PublicWork) => {
  const call = Config.BASE_URL + "/publicworks/update";
  const res = await TrenaAPI.network()
    .put(call)
    .type("application/json")
    .send(publicWork);

  return res.body;
};

const countPublicWork = async () => {
  const call = Config.BASE_URL + "/publicworks/count";
  const res = await TrenaAPI.network().get(call);

  return res.body;
};

const getPublicWorkById = async (id: string) => {
  const call = Config.BASE_URL + `/publicworks/${id}`;
  const res = await TrenaAPI.network().get(call);

  return res.body;
};

const getPublicWorksWithCollectsInQueue = async () => {
  const call = Config.BASE_URL + `/publicworks/citizen/queue`;
  const res = await TrenaAPI.network().get(call);

  return res.body;
};

export const PublicWorkServiceQuery = {
  loadPublicWorks,
  getPublicWorkById,
  getPublicWorksWithCollectsInQueue,
  deletePublicWork,
  addPublicWork,
  updatePublicWork,
  countPublicWork,
};
