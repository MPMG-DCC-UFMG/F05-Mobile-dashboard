import { useQuery } from "react-query";
import { useTypePhotoStore } from "../../../store/typePhoto";
import { TypePhotoServiceQuery } from "../../services/TypePhotoService";

export function useLoadTypePhotos() {
	const { setTypePhotos, setEditDialog } = useTypePhotoStore();

	return useQuery(["getTypePhotos"], TypePhotoServiceQuery.loadTypePhotos, {
		onSuccess: (data) => {
			setTypePhotos(data);
			setEditDialog(Array(data.length).fill(false));
		},
	});
}
