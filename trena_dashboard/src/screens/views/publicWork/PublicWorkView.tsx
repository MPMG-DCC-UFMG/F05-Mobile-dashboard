import { observer } from 'mobx-react'
import React from 'react'
import { Col, Row } from 'reactstrap'
import { PublicWorkDetails } from '../../../components/details/PublicWorkDetails'
import { ListInspection } from '../../../components/lists/ListInspection'
import { PublicWorkMenu } from '../../../components/menus/PublicWorkMenu'
import Config from '../../../config/Config'
import { useStores } from '../../../core/contexts/UseStores'
import { EmptyView } from '../EmptyView'

var rendered = false

export const PublicWorkView = observer(() => {
  const { publicWorkStore, workStatusStore, inspectionStore } = useStores()
  const publicWork = publicWorkStore.selectedPublicWork
  const collectCount = publicWorkStore.collectsOfPublicWork.length
  const photos = publicWorkStore.photos

  inspectionStore.loadInspections()

  if (publicWork && !rendered) {
    publicWorkStore.retrievePhotos(publicWork.id)

    rendered = true
    setTimeout(function () {
      rendered = false
    }, 2000)
  }

  const handleDownloadCollectClicked = () => {}

  const getWorkStatus = (_status?: number): string => {
    const status = _status
    if (status) {
      const workStatus = workStatusStore.getWorkStatusByFlag(status)
      return workStatus?.name ?? '--'
    } else {
      return '--'
    }
  }

  const createUrl = (filepath: string): string => {
    var url_photo = filepath + `?X-TRENA-KEY=${Config.API_KEY}`
    console.log(url_photo)
    return url_photo
  }

  return (
    <>
      {publicWork ? (
        <div className="box">
          <article className="media">
            <div className="media-content">
              <div className="content has-text-left">
                <PublicWorkDetails publicWork={publicWork} />
                <PublicWorkMenu
                  collectCount={collectCount}
                  workStateUser={getWorkStatus(publicWork?.user_status)}
                  workStateIA={getWorkStatus(publicWork?.rnn_status)}
                  onDownloadClicked={handleDownloadCollectClicked}
                />
                <Row>
                  {photos.map(photo => {
                    return (
                      <Col md={4}>
                        <img src={createUrl(photo)} alt="" />
                      </Col>
                    )
                  })}
                </Row>
                <Row style={{ height: '30px' }} />
                <ListInspection />
              </div>
            </div>
          </article>
        </div>
      ) : (
        <EmptyView />
      )}
    </>
  )
})
