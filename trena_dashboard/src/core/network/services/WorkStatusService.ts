import { QueryFunctionContext } from "react-query";
import Config from "../../../config/Config";
import { WorkStatus } from "../../models/WorkStatus";
import TrenaAPI from "../TrenaAPI";

async function loadWorkStatus(): Promise<WorkStatus[]> {
	const call = Config.BASE_URL + "/workstatus/";
	const res = await TrenaAPI.network().get(call);

	return res.body;
}

async function loadWorkStatusById(
	ctx: QueryFunctionContext
): Promise<WorkStatus> {
	const [, id] = ctx.queryKey;
	const call = Config.BASE_URL + "/workstatus/id";
	const res = await TrenaAPI.network().query({ work_status_id: id }).get(call);

	return res.body;
}

async function deleteWorkStatus(workStatusFlag: number): Promise<WorkStatus> {
	const call = Config.BASE_URL + "/workstatus/delete";
	const res = await TrenaAPI.network()
		.post(call)
		.type("application/json")
		.query({ work_status_id: workStatusFlag });

	return res.body;
}

async function addWorkStatus(workStatus: WorkStatus): Promise<WorkStatus> {
	const call = Config.BASE_URL + "/workstatus/add";
	const res = await TrenaAPI.network()
		.post(call)
		.type("application/json")
		.send(workStatus);

	return res.body;
}

async function updateWorkStatus(workStatus: WorkStatus): Promise<WorkStatus> {
	const call = Config.BASE_URL + "/workstatus/update";
	const res = await TrenaAPI.network()
		.put(call)
		.type("application/json")
		.send(workStatus);

	return res.body;
}

export const WorkStatusServiceQuery = {
	loadWorkStatus,
	loadWorkStatusById,
	deleteWorkStatus,
	addWorkStatus,
	updateWorkStatus,
};
