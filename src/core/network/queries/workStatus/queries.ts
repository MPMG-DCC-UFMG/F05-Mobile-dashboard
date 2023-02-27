import { useQuery } from "react-query";
import { useWorkStatusStore } from "../../../store/workStatus";
import { WorkStatusServiceQuery } from "../../services/WorkStatusService";

export function useLoadWorkStatus() {
	const { setEditDialog, setWorkStatus } = useWorkStatusStore();

	return useQuery(["getWorkStatus"], WorkStatusServiceQuery.loadWorkStatus, {
		onSuccess: (data) => {
			setWorkStatus(data);
			setEditDialog(Array(data.length).fill(false));
		},
	});
}

export function useLoadWorkStatusById(id: number) {
	return useQuery(
		["getWorkStatusById", id],
		WorkStatusServiceQuery.loadWorkStatusById
	);
}
