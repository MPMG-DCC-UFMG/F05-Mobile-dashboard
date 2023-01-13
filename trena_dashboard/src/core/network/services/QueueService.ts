import Config from "../../../config/Config";
import TrenaAPI from "../TrenaAPI";

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
