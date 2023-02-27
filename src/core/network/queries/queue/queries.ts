import { useQuery } from "react-query";
import { useQueueStore } from "../../../store/queue";
import { PublicWorkServiceQuery } from "../../services/PublicWorkService";
import { QueueServiceQuery } from "../../services/QueueService";

export function useLoadGetCollectsInQueueByPublicWork(publicWorkId: string) {
	return useQuery(
		["getCollectsInQueueByPublicWork", publicWorkId],
		QueueServiceQuery.getCollects
	);
}

export function useLoadPublicWorkQueue() {
	const { setEvaluatePublicWorkDialog, setPublicWorkQueue } = useQueueStore();

	return useQuery(
		["getPublicWorkQueue"],
		PublicWorkServiceQuery.loadPublicWorkQueue,
		{
			onSuccess: (data) => {
				setPublicWorkQueue(data);
				setEvaluatePublicWorkDialog(Array(data.length).fill(false));
			},
		}
	);
}
