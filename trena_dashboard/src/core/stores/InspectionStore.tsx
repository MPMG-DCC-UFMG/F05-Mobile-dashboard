/* eslint-disable @typescript-eslint/no-unused-vars */
import { action, observable, runInAction } from "mobx";
import { Inspection } from "../models/Inspection";
import { InspectionService } from "../network/services/InspectionService";
import { BaseStore } from "./BaseStore";

export class InspectionStore extends BaseStore {
  private inspectionsFullList: Inspection[] = [];

  @observable inspectionList: Inspection[] = [];
  @observable selectedInspection?: Inspection = undefined;

  @action
  async loadInspections() {
    this.baseCall(async () => {
      const inspections = await InspectionService.loadInspections();
      runInAction(() => {
        this.inspectionsFullList = inspections;
        this.search("");
      });
    });
  }

  @action
  async getInspectionsByPublicWorkId(publicWorkId: string) {
    this.baseCall(async () => {
      const inspections = await InspectionService.getPublicWorkInspections(
        publicWorkId
      );
      runInAction(() => {
        this.inspectionList = inspections;
      });
    });
  }

  @action
  async loadInspectionsByWorkId(public_work_id: string) {
    this.baseCall(async () => {
      const inspections = await InspectionService.loadInspections();
      runInAction(() => {
        this.inspectionsFullList = inspections.filter((item) => {
          return item.public_work_id === public_work_id;
        });
        this.search("");
      });
    });
  }

  @action
  search(query?: string) {
    if (query) {
      this.inspectionList = this.inspectionsFullList.filter((item) =>
        item.name.toUpperCase().includes(query.toUpperCase())
      );
    } else {
      this.inspectionList = this.inspectionsFullList;
    }
  }

  @action
  selectInspection(inspection?: Inspection) {
    this.selectedInspection = inspection;
  }

  @action
  async addInspection(inspection: Inspection) {
    this.baseCall(async () => {
      await InspectionService.addInspection(inspection);
      runInAction(() => {
        this.loadInspections();
      });
    });
  }

  @action
  async updateInspection(inspection: Inspection) {
    this.baseCall(async () => {
      await InspectionService.updateInspection(inspection);
      runInAction(() => {
        this.loadInspections();
      });
    });
  }
}
