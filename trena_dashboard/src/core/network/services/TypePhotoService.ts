import Config from "../../../config/Config";
import { TypePhoto } from "../../models/TypePhoto";
import TrenaAPI from "../TrenaAPI";

export class TypePhotoService {
  static async loadTypePhotos(): Promise<TypePhoto[]> {
    const call = Config.BASE_URL + "/typephotos/";
    return TrenaAPI.network()
      .get(call)
      .then((res) => {
        let listOfTypePhotos: TypePhoto[] = res.body;

        return listOfTypePhotos;
      });
  }

  static async deleteTypePhoto(typePhotoFlag: number) {
    const call = Config.BASE_URL + "/typephotos/delete";
    TrenaAPI.network()
      .post(call)
      .type("application/json")
      .query({ type_photo_id: typePhotoFlag })
      .then()
      .catch((err) => {
        console.log(err);
      });
  }

  static async addTypePhoto(typePhoto: TypePhoto) {
    const call = Config.BASE_URL + "/typephotos/add";
    TrenaAPI.network()
      .post(call)
      .type("application/json")
      .send(typePhoto)
      .then()
      .catch((err) => {
        console.log(err);
      });
  }

  static async updateTypePhoto(typePhoto: TypePhoto) {
    const call = Config.BASE_URL + "/typephotos/update";
    TrenaAPI.network()
      .put(call)
      .type("application/json")
      .send(typePhoto)
      .then()
      .catch((err) => {
        console.log(err);
      });
  }
}

const loadTypePhotos = async () => {
  const call = Config.BASE_URL + "/typephotos/";
  const res = await TrenaAPI.network().get(call);

  return res.body;
};

const deleteTypePhoto = async (typePhotoFlag: number) => {
  const call = Config.BASE_URL + "/typephotos/delete";
  const res = await TrenaAPI.network()
    .post(call)
    .type("application/json")
    .query({ type_photo_id: typePhotoFlag });

  return res.body;
};

const addTypePhoto = async (typePhoto: TypePhoto) => {
  const call = Config.BASE_URL + "/typephotos/add";
  const res = await TrenaAPI.network()
    .post(call)
    .type("application/json")
    .send(typePhoto);

  return res.body;
};

const updateTypePhoto = async (typePhoto: TypePhoto) => {
  const call = Config.BASE_URL + "/typephotos/update";
  const res = await TrenaAPI.network()
    .put(call)
    .type("application/json")
    .send(typePhoto);

  return res.body;
};

export const TypePhotoServiceQuery = {
  loadTypePhotos,
  deleteTypePhoto,
  addTypePhoto,
  updateTypePhoto,
};
