import { useQuery } from "react-query";
import { useTypeWorkStore } from "../../../store/typeWorks";
import { TypeWorkServiceQuery } from "../../services/TypeWorkService";

export function useLoadTypeWorks() {
	const { setTypeWorks, setEditDialog, setDeleteDialog } = useTypeWorkStore();

	return useQuery(["getTypeWorks"], TypeWorkServiceQuery.loadTypeWorks, {
		onSuccess: (data) => {
			setTypeWorks(data);
			setEditDialog(Array(data.length).fill(false));
			setDeleteDialog(Array(data.length).fill(false));
		},
	});
}

export function useLoadTypeWorkStatus(flag: number) {
	return useQuery(
		["getTypeWorkStatus", flag],
		TypeWorkServiceQuery.loadTypeWorkWorkStatus
	);
}

export function useLoadTypeWorkTypePhotos(flag: number) {
	return useQuery(
		["getTypeWorkTypePhoto", flag],
		TypeWorkServiceQuery.loadTypeWorkTypePhotos
	);
}
