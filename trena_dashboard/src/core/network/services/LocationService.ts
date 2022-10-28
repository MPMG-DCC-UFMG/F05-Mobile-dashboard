import Config from "../../../config/Config";
import { Address } from "../../models/Address";
import TrenaAPI from "../TrenaAPI";

export class LocationService {
  static async queryCEPTrena(cep: string): Promise<Address> {
    const call = Config.BASE_URL + "/address/by_cep/";
    return TrenaAPI.network()
      .get(call)
      .query({ cep: cep })
      .then((res) => {
        return res.body;
      });
  }
}

const queryCEPTrena = async (cep: string) => {
  const call = Config.BASE_URL + "/address/by_cep/";
  const res = await TrenaAPI.network().get(call).query({ cep: cep });
  return res.body;
};

export const LocationServiceQuery = {
  queryCEPTrena,
};
