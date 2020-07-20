import {TypePhoto} from "../models/TypePhoto";
import {action, observable, runInAction} from "mobx";
import {BaseStore} from "./BaseStore";
import {TypePhotoService} from "../services/TypePhotoService";

export class TypePhotoStore extends BaseStore {

    private fullTypePhotoList: TypePhoto[] = [];

    @observable typePhotoList: TypePhoto[] = [];
    @observable isLoading = false;
    @observable selectedTypePhoto?: TypePhoto = undefined

    @action
    async loadTypePhotoList() {
        this.baseCall(async () => {
            const typePhotos = await TypePhotoService.loadTypePhotos()
            runInAction(() => {
                    this.fullTypePhotoList = typePhotos;
                    this.search("")
                }
            )
        })
    }

    @action
    selectTypePhoto(typePhoto?: TypePhoto) {
        this.selectedTypePhoto = typePhoto
    }

    @action
    search(query?: string) {
        if (query) {
            this.typePhotoList = this.fullTypePhotoList.filter(item => item.name.includes(query))
        } else {
            this.typePhotoList = this.fullTypePhotoList
        }
    }

    @action
    async deleteTypeOfPhoto(typePhotoFlag: number) {
        this.baseCall(async () => {
            await TypePhotoService.deleteTypePhoto(typePhotoFlag)
            runInAction(() => {
                this.loadTypePhotoList()
            })
        })
    }
}