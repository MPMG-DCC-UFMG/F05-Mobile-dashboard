import Config from "../../../config/Config";
import { CreateTypePhotoDTO } from "../../models/dto/typePhotos/CreateTypePhotoDTO";
import { UpdateTypePhotoDTO } from "../../models/dto/typePhotos/UpdateTypePhotoDTO";
import { TypePhoto } from "../../models/TypePhoto";
import TrenaAPI from "../TrenaAPI";

async function loadTypePhotos(): Promise<TypePhoto[]> {
	const call = Config.BASE_URL + "/typephotos/";
	const res = await TrenaAPI.network().get(call);

	return res.body;
}

async function deleteTypePhoto(typePhotoFlag: number): Promise<TypePhoto> {
	const call = Config.BASE_URL + "/typephotos/delete";
	const res = await TrenaAPI.network()
		.post(call)
		.type("application/json")
		.query({ type_photo_id: typePhotoFlag });

	return res.body;
}

async function addTypePhoto(typePhoto: CreateTypePhotoDTO): Promise<TypePhoto> {
	const call = Config.BASE_URL + "/typephotos/add";
	const res = await TrenaAPI.network()
		.post(call)
		.type("application/json")
		.send(typePhoto);

	return res.body;
}

async function updateTypePhoto(
	typePhoto: UpdateTypePhotoDTO
): Promise<TypePhoto> {
	const call = Config.BASE_URL + "/typephotos/update";
	const res = await TrenaAPI.network()
		.put(call)
		.type("application/json")
		.send(typePhoto);

	return res.body;
}

export const TypePhotoServiceQuery = {
	loadTypePhotos,
	deleteTypePhoto,
	addTypePhoto,
	updateTypePhoto,
};
