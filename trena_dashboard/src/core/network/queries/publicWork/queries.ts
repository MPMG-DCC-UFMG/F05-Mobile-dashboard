import { useQuery } from "react-query";
import { usePublicWorkStore } from "../../../store/publicWork";
import { useQueueStore } from "../../../store/queue";
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
	const { setPublicWorkWithCollectsInQueue, setEvaluateCollectsDialog } =
		useQueueStore();

	return useQuery(
		["publicWorksWithCollectsInQueue"],
		PublicWorkServiceQuery.getPublicWorksWithCollectsInQueue,
		{
			onSuccess: (data) => {
				setPublicWorkWithCollectsInQueue(data);
				setEvaluateCollectsDialog(Array(data.length).fill(false));
			},
		}
	);
}
