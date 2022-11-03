import Config from "../../../config/Config";
import { Collect } from "../../models/Collect";
import { PaginatedResponse } from "../models/PaginatedResponse";
import TrenaAPI from "../TrenaAPI";

export class CollectService {
  static async loadPublicWorkCollects(
    publicWorkId: string
  ): Promise<Collect[]> {
    const call = Config.BASE_URL + "/collects/publicWork";
    return TrenaAPI.network()
      .get(call)
      .query({ public_work_id: publicWorkId })
      .then((res) => {
        let listCollects: Collect[] = res.body;

        return listCollects;
      });
  }

  static async loadCollectsPaginated(
    page: number
  ): Promise<PaginatedResponse<Collect>> {
    const call = Config.BASE_URL + "/collects/paginated";
    return TrenaAPI.network()
      .get(call)
      .query({ page: page, per_page: 20 })
      .then((res) => {
        let listCollects: PaginatedResponse<Collect> = res.body;

        return listCollects;
      });
  }

  static async collectMonthCount(): Promise<number> {
    const call = Config.BASE_URL + "/collects/month/count";
    return TrenaAPI.network()
      .get(call)
      .then((res) => {
        let collectCount: number = res.body;

        return collectCount;
      });
  }

  static async retrievePhotos(publicWorkId: string): Promise<string[]> {
    const call = Config.BASE_URL + "/collects/report/json";
    return TrenaAPI.network()
      .get(call)
      .query({ public_work_id: publicWorkId })
      .then((res) => {
        var photos: string[] = [];
        var collects = res.body;
        for (let index = 0; index < collects.length; index++) {
          const collect = collects[index];
          photos.push(collect.photos[0].filepath);
        }

        return photos;
      });
  }

  static async downloadJSONReport(publicWorkId: string) {
    const call = Config.BASE_URL + "/collects/report/json/file";
    TrenaAPI.network()
      .get(call)
      .responseType("blob")
      .query({ public_work_id: publicWorkId })
      .then((res) => {
        const data: Blob = res.body;
        this.saveData(data, publicWorkId);
      });
  }

  private static saveData = (data: Blob, filename: string = "filename") => {
    const csvURL = window.URL.createObjectURL(data);
    let tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", filename + ".json");
    tempLink.click();
  };
}

const loadPublicWorkCollects = async (publicWorkId: string) => {
  const call = Config.BASE_URL + "/collects/publicWork";
  const res = await TrenaAPI.network()
    .get(call)
    .query({ public_work_id: publicWorkId });

  return res.body;
};

const loadAllCollects = async () => {
  const call = Config.BASE_URL + "/collects/";
  const res = await TrenaAPI.network().get(call);

  return res.body;
};

const loadCollectsPaginated = async (page: number) => {
  const call = Config.BASE_URL + "/collects/paginated";
  const res = await TrenaAPI.network()
    .get(call)
    .query({ page: page, per_page: 20 });

  return res.body;
};

const collectMonthCount = async () => {
  const call = Config.BASE_URL + "/collects/month/count";
  const res = await TrenaAPI.network().get(call);

  return res.body;
};

const retrievePhotos = async (publicWorkId: string) => {
  const call = Config.BASE_URL + "/collects/report/json";
  const res = await TrenaAPI.network()
    .get(call)
    .query({ public_work_id: publicWorkId });

  const collects: Collect[] = res.body;
  const photos = collects.map((collect) => collect.photos[0].filepath);
  return photos;
};

const downloadJSONReport = async (publicWorkId: string) => {
  const call = Config.BASE_URL + "/collects/report/json/file";
  const res = await TrenaAPI.network()
    .get(call)
    .responseType("blob")
    .query({ public_work_id: publicWorkId });

  const data: Blob = res.body;
  return saveData(data, publicWorkId);
};

const saveData = (data: Blob, filename: string = "filename") => {
  const csvURL = window.URL.createObjectURL(data);
  let tempLink = document.createElement("a");
  tempLink.href = csvURL;
  tempLink.setAttribute("download", filename + ".json");
  tempLink.click();
};

export const CollectServiceQuery = {
  loadPublicWorkCollects,
  loadCollectsPaginated,
  loadAllCollects,
  collectMonthCount,
  retrievePhotos,
  downloadJSONReport,
  saveData,
};
