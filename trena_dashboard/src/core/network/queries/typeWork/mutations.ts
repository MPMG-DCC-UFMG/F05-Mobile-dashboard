import { useMutation, useQueryClient } from "react-query";
import { Notify } from "../../../../components/Toast/Notify";
import { TypeWorkServiceQuery } from "../../services/TypeWorkService";

export function useAddTypeWork() {
	const queryClient = useQueryClient();

	return useMutation(TypeWorkServiceQuery.addTypeWork, {
		onSuccess: () => {
			Notify("Tipo de Obra adicionado com sucesso!", "bottom-left", "success");
			queryClient.invalidateQueries("getTypeWorks");
		},
		onError: () => {
			Notify("Erro ao adicionar tipo de obra!", "bottom-left", "error");
		},
	});
}

export function useDeleteTypeWork() {
	const queryClient = useQueryClient();

	return useMutation(TypeWorkServiceQuery.deleteTypeWork, {
		onSuccess: () => {
			Notify("Tipo de Obra deletada com sucesso!", "bottom-left", "success");
			queryClient.invalidateQueries("getTypeWorks");
		},
		onError: () => {
			Notify("Erro ao deletar Tipo de Obra!", "bottom-left", "error");
		},
	});
}

export function useUpdateTypeWork() {
	const queryClient = useQueryClient();

	return useMutation(TypeWorkServiceQuery.deleteTypeWork, {
		onSuccess: () => {
			Notify("Tipo de Obra atualizada com sucesso!", "bottom-left", "success");
			queryClient.invalidateQueries("getTypeWorks");
		},
		onError: () => {
			Notify("Erro ao atualizar Tipo de Obra!", "bottom-left", "error");
		},
	});
}

export function useUpdateTypeWorkStatus() {
	const queryClient = useQueryClient();

	return useMutation(TypeWorkServiceQuery.updateTypeWorkWorkStatus, {
		onSuccess: () => {
			Notify(
				"Estados de Tipo de Obra atualizada com sucesso!",
				"bottom-left",
				"success"
			);
			queryClient.invalidateQueries("getTypeWorks");
		},
		onError: () => {
			Notify(
				"Erro ao atualizar Estados de Tipo de Obra!",
				"bottom-left",
				"error"
			);
		},
	});
}

export function useUpdateTypeWorkPhotos() {
	const queryClient = useQueryClient();

	return useMutation(TypeWorkServiceQuery.updateTypeWorkTypePhoto, {
		onSuccess: () => {
			Notify(
				"Fotos de Tipo de Obra atualizada com sucesso!",
				"bottom-left",
				"success"
			);
			queryClient.invalidateQueries("getTypeWorks");
		},
		onError: () => {
			Notify(
				"Erro ao atualizar Fotos de Tipo de Obra!",
				"bottom-left",
				"error"
			);
		},
	});
}
