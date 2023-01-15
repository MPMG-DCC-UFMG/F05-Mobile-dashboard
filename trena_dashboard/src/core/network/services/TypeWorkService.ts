import { QueryFunctionContext } from "react-query";
import Config from "../../../config/Config";
import { CreateTypeWorkDTO } from "../../models/dto/typeWork/CreateTypeWorkDTO";
import { UpdateTypeWorkDTO } from "../../models/dto/typeWork/UpdateTypeWorkDTO";
import { TypePhoto } from "../../models/TypePhoto";
import { TypeWork } from "../../models/TypeWork";
import { WorkStatus } from "../../models/WorkStatus";

import TrenaAPI from "../TrenaAPI";

type UpdateParams = {
	updateFlags: number[];
	typeWorkFlag: number;
};

async function loadTypeWorks(): Promise<TypeWork[]> {
	const call = Config.BASE_URL + "/typeworks/";
	const res = await TrenaAPI.network().get(call);

	return res.body;
}

async function deleteTypeWork(typeWorkFlag: number): Promise<TypeWork> {
	const call = Config.BASE_URL + "/typeworks/delete";
	const res = await TrenaAPI.network()
		.post(call)
		.type("application/json")
		.query({ type_work_id: typeWorkFlag });

	return res.body;
}

async function addTypeWork(typeWork: CreateTypeWorkDTO): Promise<TypeWork> {
	const call = Config.BASE_URL + "/typeworks/add";
	const res = await TrenaAPI.network()
		.post(call)
		.type("application/json")
		.send(typeWork);

	return res.body;
}

async function updateTypeWork(typeWork: UpdateTypeWorkDTO): Promise<TypeWork> {
	const call = Config.BASE_URL + "/typeworks/update";
	const res = await TrenaAPI.network()
		.put(call)
		.type("application/json")
		.send(typeWork);

	return res.body;
}

async function updateTypeWorkWorkStatus(
	updateConfig: UpdateParams
): Promise<TypeWork> {
	const { typeWorkFlag, updateFlags } = updateConfig;
	const call = Config.BASE_URL + "/typeworks/workStatus/update";
	const res = await TrenaAPI.network()
		.post(call)
		.type("application/json")
		.send({ type_work_id: typeWorkFlag, work_statuses: updateFlags });

	return res.body;
}

async function loadTypeWorkWorkStatus(
	ctx: QueryFunctionContext
): Promise<WorkStatus[]> {
	const [, typeWorkFlag] = ctx.queryKey;
	const call = Config.BASE_URL + "/typeworks/workStatus/all";
	const res = await TrenaAPI.network()
		.get(call)
		.query({ type_work_id: typeWorkFlag });

	return res.body;
}

async function updateTypeWorkTypePhoto(
	updateConfig: UpdateParams
): Promise<TypeWork> {
	const { typeWorkFlag, updateFlags } = updateConfig;
	const call = Config.BASE_URL + "/typeworks/typePhoto/update";
	const res = await TrenaAPI.network()
		.post(call)
		.type("application/json")
		.send({ type_work_id: typeWorkFlag, type_photos: updateFlags });

	return res.body;
}

async function loadTypeWorkTypePhotos(
	ctx: QueryFunctionContext
): Promise<TypePhoto[]> {
	const [, typeWorkFlag] = ctx.queryKey;
	const call = Config.BASE_URL + "/typeworks/typePhoto/all";
	const res = await TrenaAPI.network()
		.get(call)
		.query({ type_work_id: typeWorkFlag });

	return res.body;
}

export const TypeWorkServiceQuery = {
	loadTypeWorks,
	deleteTypeWork,
	addTypeWork,
	updateTypeWork,
	updateTypeWorkWorkStatus,
	loadTypeWorkWorkStatus,
	updateTypeWorkTypePhoto,
	loadTypeWorkTypePhotos,
};
