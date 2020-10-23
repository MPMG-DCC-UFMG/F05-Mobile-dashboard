import {TypePhoto} from "../../models/TypePhoto";
import Config from "../../../config/Config";
import {network} from "../NetworkInterceptor";

export class TypePhotoService {

    static async loadTypePhotos(): Promise<TypePhoto[]> {
        const call = Config.BASE_URL + "/typephotos/"
        return network.get(call)
            .then(res => {
                let listOfTypePhotos: TypePhoto[] = res.body

                return listOfTypePhotos
            })
    }

    static async deleteTypePhoto(typePhotoFlag: number) {
        const call = Config.BASE_URL + "/typephotos/delete"
        network.post(call)
            .type('application/json')
            .query({type_photo_id: typePhotoFlag})
            .then().catch(err => {
            console.log(err)
        });
    }

    static async addTypePhoto(typePhoto: TypePhoto) {
        const call = Config.BASE_URL + "/typephotos/add"
        network.post(call)
            .type('application/json')
            .send(typePhoto)
            .then().catch(err => {
            console.log(err)
        });
    }

    static async updateTypePhoto(typePhoto: TypePhoto) {
        const call = Config.BASE_URL + "/typephotos/update"
        network.put(call)
            .type('application/json')
            .send(typePhoto)
            .then().catch(err => {
            console.log(err)
        });
    }
}