import { useQuery } from "react-query";
import { useInspectionStore } from "../../../store/inspection";
import { useNotificationsStore } from "../../../store/notification";
import { InspectionServiceQuery } from "../../services/InspectionService";

export function useLoadInspections() {
	const setCollectModal = useInspectionStore((state) => state.setCollectModal);
	const setInspections = useInspectionStore((state) => state.setInspections);
	const setSendNotificationDialog = useNotificationsStore(
		(state) => state.setSendNotificationDialog
	);
	const setInspectionNotificationsDialog = useNotificationsStore(
		(state) => state.setInspectionNotificationsDialog
	);

	return useQuery(
		["getMpInspections"],
		InspectionServiceQuery.loadInspections,
		{
			onSuccess(data) {
				setInspections(data);
				setCollectModal(Array(data.length).fill(false));
				setSendNotificationDialog(Array(data.length).fill(false));
				setInspectionNotificationsDialog(Array(data.length).fill(false));
			},
		}
	);
}

export function useCountMpInspections() {
	return useQuery(
		["mpInspectionsCount"],
		InspectionServiceQuery.countMpInspections
	);
}

export function useGetPublicWorkInspections(publicWorkId: string) {
	return useQuery(
		["getPublicWorkInspections", publicWorkId],
		InspectionServiceQuery.getPublicWorkInspections
	);
}

export function useGetInspectionCollects(inspectionFlag: number) {
	return useQuery(
		["getInspectionCollects", inspectionFlag],
		InspectionServiceQuery.getInspectionCollects
	);
}
