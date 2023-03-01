import React from "react"
import { Collect } from "../../../core/models/Collect"
import { useGetPublicWorkById } from "../../../core/network/queries/publicWork/queries"
import { convertEphocDate } from "../../../utils/mapper"
import { InfoAccorion } from "../../Accordion"
import { PublicWorkMapView } from "../../Queue/PublicWorkMapView"
import { RawSwiper } from "../../Swiper"
import { TableDialogContainer, TableDialogProps } from "../DialogContainer"

interface CollectSubmissionDialogProps extends TableDialogProps {
  collect: Collect
}

export function CollectSubmissionDialog({
  collect,
  state,
  setState,
  index,
  fullScreen
}: CollectSubmissionDialogProps) {
  const { data: publicWork } = useGetPublicWorkById(collect.public_work_id)

  return (
    <TableDialogContainer
      state={state}
      setState={setState}
      title={`${publicWork?.name} - ${convertEphocDate(collect.date)}`}
      index={index}
      fullScreen={fullScreen}
    >
      {publicWork && (
        <>
          <InfoAccorion title="Localização">
            <PublicWorkMapView publicWork={publicWork} />
          </InfoAccorion>
          <InfoAccorion title="Medias">
            <RawSwiper collect={collect} />
          </InfoAccorion>
        </>
      )}
    </TableDialogContainer>
  )
}
