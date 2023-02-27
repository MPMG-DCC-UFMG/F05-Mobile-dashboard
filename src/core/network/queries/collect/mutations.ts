import { useMutation, useQueryClient } from "react-query";
import { Notify } from "../../../../components/Toast/Notify";
import { CollectServiceQuery } from "../../services/CollectService";

export function useUpdateCollect() {
	const queryClient = useQueryClient();

	return useMutation(CollectServiceQuery.updateCollect, {
		onError: () => {
			Notify(
				"Erro ao avaliar Envio! Verifique os campos",
				"bottom-left",
				"error"
			);
		},
		onSuccess: () => {
			Notify("Envio avaliado com sucesso!", "bottom-left", "success");
			queryClient.invalidateQueries("getCollectsInQueue");
		},
	});
}

export function useDeletePhoto() {
	return useMutation(CollectServiceQuery.deletePhoto);
}

export function useDeleteCollect() {
	const queryClient = useQueryClient();

	return useMutation(CollectServiceQuery.deleteCollect, {
		onError: () => {
			Notify("Erro ao excluir Vistoria Cidadã!", "bottom-left", "error");
		},
		onSuccess: () => {
			Notify("Vistoria Cidadã excluída com sucesso!", "bottom-left", "success");
			queryClient.invalidateQueries("getCitizenCollects");
		},
	});
}
