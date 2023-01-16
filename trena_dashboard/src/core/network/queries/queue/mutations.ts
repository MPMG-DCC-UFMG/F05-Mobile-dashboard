import { useMutation, useQueryClient } from "react-query";
import { Notify } from "../../../../components/Toast/Notify";
import { useQueueStore } from "../../../store/queue";
import { CollectServiceQuery } from "../../services/CollectService";
import { PublicWorkServiceQuery } from "../../services/PublicWorkService";

export function useAcceptPublicWork() {
	const queryClient = useQueryClient();
	const { publicWorkQueue, setPublicWorkQueue } = useQueueStore();

	return useMutation(PublicWorkServiceQuery.updatePublicWork, {
		onSuccess: (data) => {
			Notify("Obra Pública aceita com sucesso!", "bottom-left", "success");
			setPublicWorkQueue(publicWorkQueue.filter((pw) => pw.id !== data.id));
			queryClient.invalidateQueries(["getPublicWorkQueue", "getPublicWorks"]);
		},
		onError: () => {
			Notify("Erro ao aceitar Obra Pública!", "bottom-left", "error");
		},
	});
}

export function useRefusePublicWork() {
	const queryClient = useQueryClient();
	const { publicWorkQueue, setPublicWorkQueue } = useQueueStore();

	return useMutation(PublicWorkServiceQuery.updatePublicWork, {
		onSuccess: (data) => {
			Notify("Obra Pública rejeitada com sucesso!", "bottom-left", "success");
			setPublicWorkQueue(publicWorkQueue.filter((pw) => pw.id !== data.id));
			queryClient.invalidateQueries(["getPublicWorkQueue"]);
		},
		onError: () => {
			Notify("Erro ao rejeitar Obra Pública!", "bottom-left", "error");
		},
	});
}

export function useAcceptCollect() {
	const queryClient = useQueryClient();
	const { publicWorkWithCollectsInQueue, setPublicWorkWithCollectsInQueue } =
		useQueueStore();

	return useMutation(CollectServiceQuery.updateCollect, {
		onSuccess: (data) => {
			Notify("Vistoria Cidadã aceita com sucesso!", "bottom-left", "success");
			setPublicWorkWithCollectsInQueue(
				publicWorkWithCollectsInQueue.filter(
					(pw) => pw.id !== data.public_work_id
				)
			);
			queryClient.invalidateQueries([
				"publicWorksWithCollectsInQueue",
				"getCitizenCollects",
			]);
		},
		onError: () => {
			Notify("Erro ao aceitar Vistoria Cidadã!", "bottom-left", "error");
		},
	});
}

export function useRefuseCollect() {
	const queryClient = useQueryClient();
	const { publicWorkWithCollectsInQueue, setPublicWorkWithCollectsInQueue } =
		useQueueStore();

	return useMutation(CollectServiceQuery.updateCollect, {
		onSuccess: (data) => {
			Notify(
				"Vistoria Cidadã rejeitada com sucesso!",
				"bottom-left",
				"success"
			);
			setPublicWorkWithCollectsInQueue(
				publicWorkWithCollectsInQueue.filter(
					(pw) => pw.id !== data.public_work_id
				)
			);
			queryClient.invalidateQueries(["publicWorksWithCollectsInQueue"]);
		},
		onError: () => {
			Notify("Erro ao rejeitar Vistoria Cidadã!", "bottom-left", "error");
		},
	});
}

export function useDeletePhoto() {
	return useMutation(CollectServiceQuery.deletePhoto);
}
