import { useQuery } from "react-query";
import { WorkStatusServiceQuery } from "../../services/WorkStatusService";

export function useLoadWorkStatus() {
	return useQuery(["getWorkStatus"], WorkStatusServiceQuery.loadWorkStatus);
}

export function useLoadWorkStatusById(id: number) {
	return useQuery(
		["getWorkStatusById", id],
		WorkStatusServiceQuery.loadWorkStatusById
	);
}
