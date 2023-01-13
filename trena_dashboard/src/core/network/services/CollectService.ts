import { QueryFunctionContext } from "react-query";
import Config from "../../../config/Config";
import { Collect } from "../../models/Collect";
import { Photo } from "../../models/Photo";
import TrenaAPI from "../TrenaAPI";

async function loadPublicWorkCollects(
	ctx: QueryFunctionContext
): Promise<Collect[]> {
	const [, publicWorkId] = ctx.queryKey;
	const call = Config.BASE_URL + "/collects/publicWork";
	const res = await TrenaAPI.network()
		.get(call)
		.query({ public_work_id: publicWorkId });

	return res.body;
}

async function loadAllCollects(): Promise<Collect[]> {
	const call = Config.BASE_URL + "/collects/";
	const res = await TrenaAPI.network().get(call);

	return res.body;
}

async function loadAllCitizenCollects(): Promise<Collect[]> {
	const call = Config.BASE_URL + "/collects/citizen";
	const res = await TrenaAPI.network().get(call);

	return res.body;
}

async function loadCollectsPaginated(
	ctx: QueryFunctionContext
): Promise<Collect[]> {
	const [, page] = ctx.queryKey;
	const call = Config.BASE_URL + "/collects/paginated";
	const res = await TrenaAPI.network()
		.get(call)
		.query({ page: page, per_page: 20 });

	return res.body;
}

async function collectMonthCount(): Promise<number> {
	const call = Config.BASE_URL + "/collects/month/count";
	const res = await TrenaAPI.network().get(call);

	return res.body;
}

async function retrievePhotos(ctx: QueryFunctionContext): Promise<string[]> {
	const [, publicWorkId] = ctx.queryKey;
	const call = Config.BASE_URL + "/collects/report/json";
	const res = await TrenaAPI.network()
		.get(call)
		.query({ public_work_id: publicWorkId });

	const collects: Collect[] = res.body;
	const photos = collects.map((collect) => collect.photos[0].filepath);
	return photos;
}

async function downloadJSONReport(ctx: QueryFunctionContext): Promise<void> {
	const [, publicWorkId] = ctx.queryKey;
	const call = Config.BASE_URL + "/collects/report/json/file";
	const res = await TrenaAPI.network()
		.get(call)
		.responseType("blob")
		.query({ public_work_id: publicWorkId });

	const data: Blob = res.body;
	return saveData(data, publicWorkId as string);
}

async function getMediaMetaDataByCollectId(
	ctx: QueryFunctionContext
): Promise<Photo[]> {
	const [, collectId] = ctx.queryKey;
	const call = Config.BASE_URL + `/photos/collect/${collectId}`;
	const res = await TrenaAPI.network().get(call);

	return res.body;
}

const getMediaMetaDataByCollectIdFixed = async (
	collectId: string
): Promise<Photo[]> => {
	const call = Config.BASE_URL + `/photos/collect/${collectId}`;
	const res = await TrenaAPI.network().get(call);

	return res.body;
};

async function getMediaByCollectFileName(
	ctx: QueryFunctionContext
): Promise<string> {
	const [, filepath] = ctx.queryKey;
	const call = Config.BASE_URL + `/images/${filepath}`;
	const res = await TrenaAPI.network().get(call).responseType("arraybuffer");

	const base64 = btoa(
		new Uint8Array(res.body).reduce(
			(data, byte) => data + String.fromCharCode(byte),
			""
		)
	);

	return base64;
}

async function getQueueCollects(): Promise<Collect[]> {
	const call = Config.BASE_URL + "/collects/citizen/queue";
	const res = await TrenaAPI.network().get(call);

	return res.body;
}

async function getQueueCollectsByPublicWorkId(
	ctx: QueryFunctionContext
): Promise<Collect[]> {
	const [, publicWorkId] = ctx.queryKey;
	const call = Config.BASE_URL + "/collects/publicwork/citizen";
	const res = await TrenaAPI.network()
		.query({ public_work_id: publicWorkId })
		.get(call);

	return res.body;
}

function saveData(data: Blob, filename = "filename"): void {
	const csvURL = window.URL.createObjectURL(data);
	const tempLink = document.createElement("a");
	tempLink.href = csvURL;
	tempLink.setAttribute("download", filename + ".json");
	tempLink.click();
}

async function updateCollect(collect: Collect): Promise<Collect> {
	const call = Config.BASE_URL + "/collects/update";
	const res = await TrenaAPI.network()
		.type("application/json")
		.put(call)
		.send(collect);

	return res.body;
}

async function deletePhoto(photo_id: string): Promise<Photo> {
	const call = Config.BASE_URL + "/photos/delete";
	const res = await TrenaAPI.network()
		.type("application/json")
		.delete(call)
		.query({ photo_id });

	return res.body;
}

async function deleteCollect(collectId: string): Promise<Collect> {
	const call = `${Config.BASE_URL}/collects/delete`;
	const res = await TrenaAPI.network()
		.delete(call)
		.query({ collect_id: collectId });

	return res.body;
}

export const CollectServiceQuery = {
	loadPublicWorkCollects,
	loadCollectsPaginated,
	loadAllCollects,
	updateCollect,
	loadAllCitizenCollects,
	getMediaMetaDataByCollectId,
	getMediaByCollectFileName,
	getQueueCollectsByPublicWorkId,
	getMediaMetaDataByCollectIdFixed,
	getQueueCollects,
	collectMonthCount,
	retrievePhotos,
	downloadJSONReport,
	saveData,
	deletePhoto,
	deleteCollect,
};
