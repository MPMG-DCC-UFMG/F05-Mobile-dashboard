import { useMutation, useQueryClient } from "react-query";
import { Notify } from "../../../../components/Toast/Notify";
import { TypePhotoServiceQuery } from "../../services/TypePhotoService";

export function useAddTypePhoto() {
	const queryClient = useQueryClient();

	return useMutation(TypePhotoServiceQuery.addTypePhoto, {
		onSuccess: () => {
			Notify("Tipo de Foto adicionado com sucesso!", "bottom-left", "success");
			queryClient.invalidateQueries("getTypePhotos");
		},
		onError: () => {
			Notify("Erro ao adicionar Tipo de Foto!", "bottom-left", "error");
		},
	});
}

export function useUpdateTypePhoto() {
	const queryClient = useQueryClient();

	return useMutation(TypePhotoServiceQuery.updateTypePhoto, {
		onSuccess: () => {
			Notify("Tipo de Foto atualizada com sucesso!", "bottom-left", "success");
			queryClient.invalidateQueries("getTypePhotos");
		},
		onError: () => {
			Notify("Erro ao atualizar Tipo de Foto!", "bottom-left", "error");
		},
	});
}

export function useDeleteTypePhoto() {
	const queryClient = useQueryClient();

	return useMutation(TypePhotoServiceQuery.deleteTypePhoto, {
		onSuccess: () => {
			Notify("Tipo de Foto deletada com sucesso!", "bottom-left", "success");
			queryClient.invalidateQueries("getTypePhotos");
		},
		onError: () => {
			Notify("Erro ao deletar Tipo de Foto!", "bottom-left", "error");
		},
	});
}
