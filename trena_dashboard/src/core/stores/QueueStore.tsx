/* eslint-disable @typescript-eslint/no-unused-vars */
import { action, observable, runInAction } from "mobx";
import { Collect } from "../models/Collect";
import { QueueItem } from "../models/QueueItem";
import { QueueService } from "../network/services/QueueService";
import { BaseStore } from "./BaseStore";

export class QueueStore extends BaseStore {
  private fullQueueItemList: QueueItem[] = [];

  @observable queueItemList: QueueItem[] = [];
  @observable selectedQueueItem?: QueueItem = undefined;
  @observable collectsOfPublicWork: Collect[] = [];
  @observable selectedCollect?: Collect = undefined;
  @observable ignoredPhotoIds: Set<string> = new Set<string>();

  @action
  async loadQueueItem() {
    this.baseCall(async () => {
      const queueItems = await QueueService.loadQueueItems();
      runInAction(() => {
        this.fullQueueItemList = queueItems;
        this.search("");
      });
    });
  }

  @action
  search(query?: string) {
    this.queueItemList = this.fullQueueItemList;
  }

  @action
  selectCollect(collect?: Collect) {
    this.selectedCollect = collect;
  }

  @action
  selectQueueItem(queueItem?: QueueItem) {
    this.selectedQueueItem = queueItem;
    if (queueItem) {
      this.getCollectOfPublicWork(queueItem?.public_work.id);
    } else {
      this.selectedCollect = undefined;
    }
    this.clearIgnoredPhotos();
  }

  @action
  deletePublicWork(publicWorkId: string) {
    this.baseCall(async () => {
      const deletePublicWork = await QueueService.deletePublicWork(
        publicWorkId
      );
      if (deletePublicWork.success) {
        runInAction(() => {
          this.selectQueueItem();
          this.loadQueueItem();
        });
      }
    });
  }

  @action
  deleteCollect(publicWorkId: string, collectId: string) {
    this.baseCall(async () => {
      const deleteCollect = await QueueService.deleteCollect(
        publicWorkId,
        collectId
      );
      if (deleteCollect.success) {
        runInAction(() => {
          this.selectQueueItem();
          this.loadQueueItem();
        });
      }
    });
  }

  @action
  clearIgnoredPhotos() {
    this.ignoredPhotoIds.clear();
  }

  @action
  addIgnoredPhotoId(photoId: string) {
    this.ignoredPhotoIds.add(photoId);
  }

  @action
  removeIgnoredPhotoId(photoId: string) {
    this.ignoredPhotoIds.delete(photoId);
  }

  @action
  getCollectOfPublicWork(publicWorkId: string) {
    this.baseCall(async () => {
      const collects = await QueueService.getCollects(publicWorkId);
      runInAction(() => {
        this.collectsOfPublicWork = collects;
      });
    });
  }

  @action
  confirmCollect() {
    const item = this.selectedQueueItem;
    const collect = this.selectedCollect;
    if (item !== undefined) {
      const publicWorkId = item.public_work.id;
      this.baseCall(async () => {
        if (item.public_work_count > 0) {
          const response = await QueueService.acceptPublicWork(publicWorkId);
          if (!response.success) {
            return;
          }
        }

        if (collect !== undefined) {
          const collectId = collect.id!;
          const collectAccept = await QueueService.acceptCollect(
            publicWorkId,
            collectId
          );
          if (collectAccept.success) {
            for (const photo of collect.photos) {
              if (this.ignoredPhotoIds.has(photo.id)) {
                await QueueService.deletePhoto(publicWorkId, photo.id);
              } else {
                await QueueService.acceptPhoto(publicWorkId, photo.id);
              }
            }
          }
        }

        runInAction(() => {
          this.selectQueueItem();
          this.loadQueueItem();
        });
      });
    }
  }
}
