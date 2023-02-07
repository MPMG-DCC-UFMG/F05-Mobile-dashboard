import { useMutation } from "react-query";
import { Notify } from "../../../../components/Toast/Notify";
import { InspectionServiceQuery } from "../../services/InspectionService";

export function useDownloadPdf() {
	return useMutation(InspectionServiceQuery.getInspectionReport, {
		onError: () => {
			Notify(
				"Esta vistoria não possui Fotos ou Vídeos para gerar um relatório!",
				"bottom-left",
				"warning"
			);
		},
	});
}

export function useDownloadDocx() {
	return useMutation(InspectionServiceQuery.getInspectionDocx, {
		onError: () => {
			Notify(
				"Esta vistoria ainda não possui nenhum conteúdo para gerar um relatório!",
				"bottom-left",
				"warning"
			);
		},
	});
}

export function useAddInspection() {
	return useMutation(InspectionServiceQuery.addInspection, {
		onError: () => {
			Notify("Erro ao adicionar Vistoria!", "bottom-left", "error");
		},
		onSuccess: () => {
			Notify("Vistoria adicionada com sucesso!", "bottom-left", "success");
		},
	});
}
