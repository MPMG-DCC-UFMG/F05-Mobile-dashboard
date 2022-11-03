import { observer } from "mobx-react";
import React from "react";
import { ItemPhoto } from "../../../components/lists/items/ItemPhoto";
import { useStores } from "../../../core/contexts/UseStores";
import { Photo } from "../../../core/models/Photo";

interface QueuePhotoViewProps {
  photos: Photo[];
}

export const QueuePhotoView: React.FC<QueuePhotoViewProps> = observer(
  (props) => {
    const { photos } = props;
    const { queueStore } = useStores();

    const handleIgnore = (photoId: string) => {
      queueStore.addIgnoredPhotoId(photoId);
    };

    const handleAccept = (photoId: string) => {
      queueStore.removeIgnoredPhotoId(photoId);
    };

    return (
      <div className="container card-container">
        {photos.map((photo) => {
          return (
            <ItemPhoto
              photo={photo}
              key={photo.id}
              filter={
                queueStore.ignoredPhotoIds.has(photo.id) ? "trena-blur" : ""
              }
              footer={
                <>
                  <a
                    className="card-footer-item"
                    onClick={() => {
                      handleIgnore(photo.id);
                    }}
                  >
                    Ignorar
                  </a>
                  <a
                    className="card-footer-item"
                    onClick={() => {
                      handleAccept(photo.id);
                    }}
                  >
                    Aceitar
                  </a>
                </>
              }
            />
          );
        })}
      </div>
    );
  }
);
