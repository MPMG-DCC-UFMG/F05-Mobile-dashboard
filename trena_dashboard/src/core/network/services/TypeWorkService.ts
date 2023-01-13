import Config from "../../../config/Config";

import { TypeWork } from "../../models/TypeWork";
import TrenaAPI from "../TrenaAPI";

const loadTypeWorks = async () => {
	const call = Config.BASE_URL + "/typeworks/";
	const res = await TrenaAPI.network().get(call);

	return res.body;
};

const deleteTypeWork = async (typeWorkFlag: number) => {
	const call = Config.BASE_URL + "/typeworks/delete";
	const res = await TrenaAPI.network()
		.post(call)
		.type("application/json")
		.query({ type_work_id: typeWorkFlag });

	return res.body;
};

const addTypeWork = async (typeWork: TypeWork) => {
	const call = Config.BASE_URL + "/typeworks/add";
	const res = await TrenaAPI.network()
		.post(call)
		.type("application/json")
		.send(typeWork);

	return res.body;
};

const updateTypeWork = async (typeWork: TypeWork) => {
	const call = Config.BASE_URL + "/typeworks/update";
	const res = await TrenaAPI.network()
		.put(call)
		.type("application/json")
		.send(typeWork);

	return res.body;
};

const updateTypeWorkWorkStatus = async (
	workStatuses: number[],
	typeWorkFlag: number
) => {
	const call = Config.BASE_URL + "/typeworks/workStatus/update";
	const res = await TrenaAPI.network()
		.post(call)
		.type("application/json")
		.send({ type_work_id: typeWorkFlag, work_statuses: workStatuses });

	return res.body;
};

const loadTypeWorkWorkStatus = async (typeWorkFlag: number) => {
	const call = Config.BASE_URL + "/typeworks/workStatus/all";
	const res = await TrenaAPI.network()
		.get(call)
		.query({ type_work_id: typeWorkFlag });

	return res.body;
};

const updateTypeWorkTypePhoto = async (
	typePhotos: number[],
	typeWorkFlag: number
) => {
	const call = Config.BASE_URL + "/typeworks/typePhoto/update";
	const res = await TrenaAPI.network()
		.post(call)
		.type("application/json")
		.send({ type_work_id: typeWorkFlag, type_photos: typePhotos });

	return res.body;
};

const loadTypeWorkTypePhotos = async (typeWorkFlag: number) => {
	const call = Config.BASE_URL + "/typeworks/typePhoto/all";
	const res = await TrenaAPI.network()
		.get(call)
		.query({ type_work_id: typeWorkFlag });

	return res.body;
};

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
