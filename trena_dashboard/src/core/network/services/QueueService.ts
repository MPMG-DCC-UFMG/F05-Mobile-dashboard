import Config from "../../../config/Config";
import { Collect } from "../../models/Collect";
import { QueueItem } from "../../models/QueueItem";
import { MPResponse } from "../models/Response";
import TrenaAPI from "../TrenaAPI";

export class QueueService {
  static async countQueue(): Promise<number> {
    const call = Config.BASE_URL + "/queue/count";
    return TrenaAPI.network()
      .get(call)
      .then((res) => {
        let queueCount: number = res.body;

        return queueCount;
      })
      .catch((error) => 0);
  }

  static async loadQueueItems(): Promise<QueueItem[]> {
    const call = Config.BASE_URL + "/queue/items";
    return TrenaAPI.network()
      .get(call)
      .then((res) => {
        let items: QueueItem[] = res.body;
        return items;
      });
  }

  static async getCollects(publicWorkId: string): Promise<Collect[]> {
    const call = Config.BASE_URL + `/queue/publicwork/${publicWorkId}/collects`;

    return TrenaAPI.network()
      .get(call)
      .then((res) => {
        let items: Collect[] = res.body;
        return items;
      });
  }

  static async acceptPublicWork(publicWorkId: string): Promise<MPResponse> {
    const call = Config.BASE_URL + `/queue/publicwork/${publicWorkId}/accept`;

    return TrenaAPI.network()
      .post(call)
      .then((res) => {
        let response: MPResponse = res.body;
        return response;
      });
  }

  static async acceptCollect(
    publicWorkId: string,
    collectId: string
  ): Promise<MPResponse> {
    const call =
      Config.BASE_URL +
      `/queue/publicwork/${publicWorkId}/collect/${collectId}/accept`;

    return TrenaAPI.network()
      .post(call)
      .then((res) => {
        let response: MPResponse = res.body;
        return response;
      });
  }

  static async deletePhoto(
    publicWorkId: string,
    photoId: string
  ): Promise<MPResponse> {
    const call =
      Config.BASE_URL +
      `/queue/publicwork/${publicWorkId}/photo/${photoId}/delete`;

    return TrenaAPI.network()
      .post(call)
      .then((res) => {
        let response: MPResponse = res.body;
        return response;
      });
  }

  static async acceptPhoto(
    publicWorkId: string,
    photoId: string
  ): Promise<MPResponse> {
    const call =
      Config.BASE_URL +
      `/queue/publicwork/${publicWorkId}/photo/${photoId}/accept`;

    return TrenaAPI.network()
      .post(call)
      .then((res) => {
        let response: MPResponse = res.body;
        return response;
      });
  }

  static async deletePublicWork(publicWorkId: string): Promise<MPResponse> {
    const call = Config.BASE_URL + `/queue/publicwork/${publicWorkId}/delete`;

    return TrenaAPI.network()
      .post(call)
      .then((res) => {
        let response: MPResponse = res.body;
        return response;
      });
  }

  static async deleteCollect(
    publicWorkId: string,
    collectId: string
  ): Promise<MPResponse> {
    const call =
      Config.BASE_URL +
      `/queue/publicwork/${publicWorkId}/collect/${collectId}/delete`;
    return TrenaAPI.network()
      .post(call)
      .then((res) => {
        let response: MPResponse = res.body;
        return response;
      });
  }
}

const countQueue = async () => {
  const call = Config.BASE_URL + "/queue/count";
  const res = await TrenaAPI.network().get(call);

  return res.body;
};

const loadQueueItems = async () => {
  const call = Config.BASE_URL + "/queue/items";
  const res = await TrenaAPI.network().get(call);

  return res.body;
};

const getCollects = async (publicWorkId: string) => {
  const call = Config.BASE_URL + `/queue/publicwork/${publicWorkId}/collects`;

  const res = await TrenaAPI.network().get(call);

  return res.body;
};

const acceptPublicWork = async (publicWorkId: string) => {
  const call = Config.BASE_URL + `/queue/publicwork/${publicWorkId}/accept`;

  const res = await TrenaAPI.network().post(call);

  return res.body;
};

const acceptCollect = async (publicWorkId: string, collectId: string) => {
  const call =
    Config.BASE_URL +
    `/queue/publicwork/${publicWorkId}/collect/${collectId}/accept`;

  const res = await TrenaAPI.network().post(call);

  return res.body;
};

const deletePhoto = async (publicWorkId: string, photoId: string) => {
  const call =
    Config.BASE_URL +
    `/queue/publicwork/${publicWorkId}/photo/${photoId}/delete`;

  const res = await TrenaAPI.network().post(call);

  return res.body;
};

const acceptPhoto = async (publicWorkId: string, photoId: string) => {
  const call =
    Config.BASE_URL +
    `/queue/publicwork/${publicWorkId}/photo/${photoId}/accept`;

  const res = await TrenaAPI.network().post(call);

  return res.body;
};

const deletePublicWork = async (publicWorkId: string) => {
  const call = Config.BASE_URL + `/queue/publicwork/${publicWorkId}/delete`;

  const res = await TrenaAPI.network().post(call);

  return res.body;
};

const deleteCollect = async (publicWorkId: string, collectId: string) => {
  const call =
    Config.BASE_URL +
    `/queue/publicwork/${publicWorkId}/collect/${collectId}/delete`;
  const res = await TrenaAPI.network().post(call);

  return res.body;
};

export const QueueServiceQuery = {
  countQueue,
  loadQueueItems,
  getCollects,
  acceptCollect,
  deleteCollect,
  acceptPublicWork,
  deletePublicWork,
  acceptPhoto,
  deletePhoto,
};
