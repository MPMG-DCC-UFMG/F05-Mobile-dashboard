import React from "react";
import { useQuery } from "react-query";
import { Collect } from "../../../core/models/Collect";
import { PublicWork } from "../../../core/models/PublicWork";
import { PublicWorkServiceQuery } from "../../../core/network/services/PublicWorkService";
import { PublicWorkMapView } from "../../Queue/PublicWorkMapView";
import { RawSwiper } from "../../Swiper";
import { TableDialogContainer, TableDialogProps } from "../DialogContainer";

interface CollectSubmissionDialogProps extends TableDialogProps {
  collect: Collect;
}

export function CollectSubmissionDialog({
  collect,
  state,
  setState,
  title,
  index,
  fullScreen,
}: CollectSubmissionDialogProps) {
  const { data: publicWork } = useQuery<PublicWork>(
    ["getCollectPublicWork", collect.id!],
    () => PublicWorkServiceQuery.getPublicWorkById(collect.public_work_id)
  );

  return (
    <TableDialogContainer
      state={state}
      setState={setState}
      title={title}
      index={index}
      fullScreen={fullScreen}
    >
      {publicWork && (
        <>
          <PublicWorkMapView publicWork={publicWork} />
          <RawSwiper collect={collect} />
        </>
      )}
    </TableDialogContainer>
  );
}
