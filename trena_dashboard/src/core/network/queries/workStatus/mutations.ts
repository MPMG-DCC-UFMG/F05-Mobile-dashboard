import { useMutation, useQueryClient } from "react-query";
import { Notify } from "../../../../components/Toast/Notify";
import { WorkStatusServiceQuery } from "../../services/WorkStatusService";

export function useAddWorkStatus() {
	const queryClient = useQueryClient();

	return useMutation(WorkStatusServiceQuery.addWorkStatus, {
		onSuccess: () => {
			Notify(
				"Estado de Obra adicionado com sucesso!",
				"bottom-left",
				"success"
			);
			queryClient.invalidateQueries("getWorkStatus");
		},
		onError: () => {
			Notify("Erro ao deletar Estado de Obra!", "bottom-left", "error");
		},
	});
}

export function useUpdateWorkStatus() {
	const queryClient = useQueryClient();

	return useMutation(WorkStatusServiceQuery.updateWorkStatus, {
		onSuccess: () => {
			Notify(
				"Estado de Obra atualizado com sucesso!",
				"bottom-left",
				"success"
			);
			queryClient.invalidateQueries("getWorkStatus");
		},
		onError: () => {
			Notify("Erro ao atualizar Estado de Obra!", "bottom-left", "error");
		},
	});
}

export function useDeleteWorkStatus() {
	const queryClient = useQueryClient();

	return useMutation(WorkStatusServiceQuery.deleteWorkStatus, {
		onSuccess: () => {
			Notify("Estado de Obra deletado com sucesso!", "bottom-left", "success");
			queryClient.invalidateQueries("getWorkStatus");
		},
		onError: () => {
			Notify("Erro ao deletar Estado de Obra!", "bottom-left", "error");
		},
	});
}
