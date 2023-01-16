import { useQueries, useQuery } from "react-query";
import { Collect } from "../../../models/Collect";
import { useCollectStore } from "../../../store/collect";
import { CollectServiceQuery } from "../../services/CollectService";

export function useLoadPublicWorkCollects(publicWorkId: string) {
	return useQuery(
		["getPublicWorkCollects", publicWorkId],
		CollectServiceQuery.loadPublicWorkCollects
	);
}

export function useLoadAllCollects() {
	return useQuery(["getAllCollects"], CollectServiceQuery.loadAllCollects);
}

export function useLoadCitizenCollects() {
	const setCollectDialog = useCollectStore((state) => state.setCollectsDialog);

	return useQuery(
		["getCitizenCollects"],
		CollectServiceQuery.loadAllCitizenCollects,
		{
			onSuccess: (data) => {
				setCollectDialog(Array(data.length).fill(false));
			},
		}
	);
}

export function useLoadCollectsPaginated() {
	return useQuery(
		["getCollectsPaginated"],
		CollectServiceQuery.loadCollectsPaginated
	);
}

export function useLoadMonthlyCollectsCount() {
	return useQuery(
		["getMonthlyCollectsCount"],
		CollectServiceQuery.collectMonthCount
	);
}

export function useRetrievePhotos(publicWorkId: string) {
	return useQuery(
		["getPublicWorkPhotos", publicWorkId],
		CollectServiceQuery.retrievePhotos
	);
}

export function useGetMediaMetadata(collectId: string) {
	return useQuery(
		["getCollectMedia", collectId],
		CollectServiceQuery.getMediaMetaDataByCollectId
	);
}

export function useGetCollectMetadata(collects: Collect[]) {
	return useQueries(
		collects.map((collect) => ({
			queryKey: ["getCollectMetadata", collect.id],
			queryFn: () =>
				CollectServiceQuery.getMediaMetaDataByCollectIdFixed(collect.id),
			enabled: collects.length > 0,
		}))
	);
}

export function useGetMediaByFilepath(filepath: string) {
	return useQuery(
		["getMedia", filepath],
		CollectServiceQuery.getMediaByCollectFileName
	);
}

export function useGetQueueCollects() {
	return useQuery(["getCollectsInQueue"], CollectServiceQuery.getQueueCollects);
}

export function useGetQueueCollectsByPublicWorkId(publicWorkId: string) {
	return useQuery(
		["getCollectsInQueueById", publicWorkId],
		CollectServiceQuery.getQueueCollectsByPublicWorkId
	);
}
