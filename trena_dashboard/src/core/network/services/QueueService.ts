import { QueryFunctionContext } from "react-query";
import Config from "../../../config/Config";
import { Collect } from "../../models/Collect";
import { PublicWork } from "../../models/PublicWork";
import TrenaAPI from "../TrenaAPI";

type HandleAction = {
	publicWorkId: string;
	entityId: string;
};

async function countQueue(): Promise<number> {
	const call = Config.BASE_URL + "/queue/count";
	const res = await TrenaAPI.network().get(call);

	return res.body;
}

async function loadQueueItems() {
	const call = Config.BASE_URL + "/queue/items";
	const res = await TrenaAPI.network().get(call);

	return res.body;
}

async function getCollects(ctx: QueryFunctionContext): Promise<Collect[]> {
	const [, publicWorkId] = ctx.queryKey;
	const call = Config.BASE_URL + `/queue/publicwork/${publicWorkId}/collects`;

	const res = await TrenaAPI.network().get(call);

	return res.body;
}

async function acceptPublicWork(publicWorkId: string): Promise<PublicWork> {
	const call = Config.BASE_URL + `/queue/publicwork/${publicWorkId}/accept`;

	const res = await TrenaAPI.network().post(call);

	return res.body;
}

async function acceptCollect({
	publicWorkId,
	entityId,
}: HandleAction): Promise<Collect> {
	const call =
		Config.BASE_URL +
		`/queue/publicwork/${publicWorkId}/collect/${entityId}/accept`;

	const res = await TrenaAPI.network().post(call);

	return res.body;
}

async function deletePhoto({ publicWorkId, entityId }: HandleAction) {
	const call =
		Config.BASE_URL +
		`/queue/publicwork/${publicWorkId}/photo/${entityId}/delete`;

	const res = await TrenaAPI.network().post(call);

	return res.body;
}

async function acceptPhoto({ publicWorkId, entityId }: HandleAction) {
	const call =
		Config.BASE_URL +
		`/queue/publicwork/${publicWorkId}/photo/${entityId}/accept`;

	const res = await TrenaAPI.network().post(call);

	return res.body;
}

async function deletePublicWork(publicWorkId: string) {
	const call = Config.BASE_URL + `/queue/publicwork/${publicWorkId}/delete`;

	const res = await TrenaAPI.network().post(call);

	return res.body;
}

async function deleteCollect({ publicWorkId, entityId }: HandleAction) {
	const call =
		Config.BASE_URL +
		`/queue/publicwork/${publicWorkId}/collect/${entityId}/delete`;
	const res = await TrenaAPI.network().post(call);

	return res.body;
}

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
