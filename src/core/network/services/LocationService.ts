import Config from "../../../config/Config";
import TrenaAPI from "../TrenaAPI";

const queryCEPTrena = async (cep: string) => {
	const call = Config.BASE_URL + "/address/by_cep/";
	const res = await TrenaAPI.network().get(call).query({ cep: cep });
	return res.body;
};

export const LocationServiceQuery = {
	queryCEPTrena,
};
