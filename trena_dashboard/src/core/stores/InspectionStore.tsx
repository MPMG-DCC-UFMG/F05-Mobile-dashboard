import {Inspection} from "../models/Inspection";
import {action, observable, runInAction} from "mobx";
import {BaseStore} from "./BaseStore";
import {InspectionService} from "../network/services/InspectionService";

export class InspectionStore extends BaseStore {

    private inspectionsFullList: Inspection[] = [];

    @observable inspectionList: Inspection[] = [];
    @observable selectedInspection?: Inspection = undefined

    @action
    async loadInspections() {
        this.baseCall(async () => {
            const inspections = await InspectionService.loadInspections()
            runInAction(() => {
                    this.inspectionsFullList = inspections;
                    this.search("")
                }
            )
        })
    }

    @action
    search(query?: string) {
        if (query) {
            this.inspectionList = this.inspectionsFullList.filter(item => item.name.toUpperCase().includes(query.toUpperCase()))
        } else {
            this.inspectionList = this.inspectionsFullList
        }
    }

    @action
    selectInspection(inspection?: Inspection) {
        this.selectedInspection = inspection
    }    

    @action
    async addInspection(inspection: Inspection) {       
        this.baseCall(async () => {
            await InspectionService.addInspection(inspection)
            runInAction(() => {
                this.loadInspections()
            })
        })        
    }

    @action
    async updateInspection(inspection: Inspection) {       
        this.baseCall(async () => {
            await InspectionService.updateInspection(inspection)
            runInAction(() => {
                this.loadInspections()
            })
        })        
    }
}