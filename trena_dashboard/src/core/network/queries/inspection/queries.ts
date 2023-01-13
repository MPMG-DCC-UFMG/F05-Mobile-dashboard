import { useQuery } from "react-query";
import { useInspectionStore } from "../../../store/inspection";
import { InspectionServiceQuery } from "../../services/InspectionService";

export function useLoadInspections() {
	const setCollectModal = useInspectionStore((state) => state.setCollectModal);

	return useQuery(
		["getMpInspections"],
		InspectionServiceQuery.loadInspections,
		{
			onSuccess(data) {
				setCollectModal(Array(data.length).fill(false));
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
