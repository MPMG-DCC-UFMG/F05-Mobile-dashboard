import { useQuery } from "react-query";
import { usePublicWorkStore } from "../../../store/publicWork";
import { PublicWorkServiceQuery } from "../../services/PublicWorkService";

export function useLoadPublicWorks() {
	const {
		setPublicWorks,
		setActionDialog,
		setAddInspection,
		setInspectionsDialog,
		setLocalizationDialog,
	} = usePublicWorkStore();

	return useQuery(["getPublicWorks"], PublicWorkServiceQuery.loadPublicWorks, {
		onSuccess: (data) => {
			setPublicWorks(data);
			setActionDialog(Array(data.length).fill(false));
			setAddInspection(Array(data.length).fill(false));
			setInspectionsDialog(Array(data.length).fill(false));
			setLocalizationDialog(Array(data.length).fill(false));
		},
	});
}

export function useLoadPublicWorksQueue() {
	return useQuery(
		["getPublicWorksQueue"],
		PublicWorkServiceQuery.loadPublicWorkQueue
	);
}

export function useCountPublicWork() {
	return useQuery(
		["getPublicWorkCount"],
		PublicWorkServiceQuery.countPublicWork
	);
}

export function useGetPublicWorkById(publicWorkId: string) {
	return useQuery(
		["getPublicWorkById", publicWorkId],
		PublicWorkServiceQuery.getPublicWorkById
	);
}

export function useGetPublicWorksWithCollectsInQueue() {
	return useQuery([
		"publicWorksWithCollectsInQueue",
		PublicWorkServiceQuery.getPublicWorksWithCollectsInQueue,
	]);
}
