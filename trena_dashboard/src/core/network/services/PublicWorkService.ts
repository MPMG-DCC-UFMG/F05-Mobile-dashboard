import Config from "../../../config/Config";
import { PublicWork } from "../../models/PublicWork";
import TrenaAPI from "../TrenaAPI";

const loadPublicWorks = async () => {
	const call = Config.BASE_URL + "/publicworks/";
	const res = await TrenaAPI.network().get(call);
	return res.body;
};

const loadPublicWorkQueue = async () => {
	const call = Config.BASE_URL + "/publicworks/queue";
	const res = await TrenaAPI.network().get(call);

	return res.body;
};

const deletePublicWork = async (publicWorkId: string) => {
	const call = Config.BASE_URL + "/publicworks/delete";
	const token = localStorage.getItem("TOKEN");
	const res = await TrenaAPI.network()

		.delete(call)
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
	const call = Config.BASE_URL + "/publicworks/citizen/queue";
	const res = await TrenaAPI.network().get(call);

	return res.body;
};

export const PublicWorkServiceQuery = {
	loadPublicWorks,
	loadPublicWorkQueue,
	getPublicWorkById,
	getPublicWorksWithCollectsInQueue,
	deletePublicWork,
	addPublicWork,
	updatePublicWork,
	countPublicWork,
};
