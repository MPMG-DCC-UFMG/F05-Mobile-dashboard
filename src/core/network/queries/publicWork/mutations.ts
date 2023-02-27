import { useMutation, useQueryClient } from "react-query";
import { Notify } from "../../../../components/Toast/Notify";
import { PublicWorkServiceQuery } from "../../services/PublicWorkService";

export function useAddPublicWork() {
	const queryClient = useQueryClient();

	return useMutation(PublicWorkServiceQuery.addPublicWork, {
		onSuccess: () => {
			Notify("Obra Pública registrada com sucesso!", "bottom-left", "success");
			queryClient.invalidateQueries("getPublicWorks");
		},
		onError: () => {
			Notify(
				"Erro ao cadastrar Obra Pública. Verifique os campos!",
				"bottom-left",
				"error"
			);
		},
	});
}

export function useUpdatePublicWork() {
	const queryClient = useQueryClient();

	return useMutation(PublicWorkServiceQuery.updatePublicWork, {
		onSuccess: () => {
			Notify("Obra Pública atualizada com sucesso!", "bottom-left", "success");
			queryClient.invalidateQueries("getPublicWorks");
		},
		onError: () => {
			Notify(
				"Erro ao atualizar Obra Pública. Verifique os campos!",
				"bottom-left",
				"error"
			);
		},
	});
}

export function useDeletePublicWork() {
	const queryClient = useQueryClient();

	return useMutation(PublicWorkServiceQuery.deletePublicWork, {
		onSuccess: () => {
			Notify("Obra Pública excluída com sucesso!", "bottom-left", "success");
			queryClient.invalidateQueries("getPublicWorks");
		},
		onError: () => {
			Notify("Erro ao excluir Obra Pública!", "bottom-left", "error");
		},
	});
}
