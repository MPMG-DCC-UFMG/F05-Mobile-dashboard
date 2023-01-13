import Config from "../../../config/Config";
import { WorkStatus } from "../../models/WorkStatus";
import TrenaAPI from "../TrenaAPI";

const loadWorkStatus = async () => {
	const call = Config.BASE_URL + "/workstatus/";
	const res = await TrenaAPI.network().get(call);

	return res.body;
};

const loadWorkStatusById = async (id: number) => {
	const call = Config.BASE_URL + "/workstatus/id";
	const res = await TrenaAPI.network().query({ work_status_id: id }).get(call);

	return res.body;
};

const deleteWorkStatus = async (workStatusFlag: number) => {
	const call = Config.BASE_URL + "/workstatus/delete";
	const res = await TrenaAPI.network()
		.post(call)
		.type("application/json")
		.query({ work_status_id: workStatusFlag });

	return res.body;
};

const addWorkStatus = async (workStatus: WorkStatus) => {
	const call = Config.BASE_URL + "/workstatus/add";
	const res = await TrenaAPI.network()
		.post(call)
		.type("application/json")
		.send(workStatus);

	return res.body;
};

const updateWorkStatus = async (workStatus: WorkStatus) => {
	const call = Config.BASE_URL + "/workstatus/update";
	const res = await TrenaAPI.network()
		.put(call)
		.type("application/json")
		.send(workStatus);

	return res.body;
};

export const WorkStatusServiceQuery = {
	loadWorkStatus,
	loadWorkStatusById,
	deleteWorkStatus,
	addWorkStatus,
	updateWorkStatus,
};
