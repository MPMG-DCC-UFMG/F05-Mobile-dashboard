import {ItemPhoto} from "../../../components/lists/items/ItemPhoto";
import React from "react";
import {Photo} from "../../../core/models/Photo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {useStores} from "../../../core/contexts/UseStores";

interface PhotoViewProps {
    photos: Photo[]
}

export const PhotoView: React.FC<PhotoViewProps> = (props) => {

    const {photos} = props
    const {collectStore} = useStores()

    const handleCloseClick = () => {
        collectStore.selectCollect(undefined)
    }

    return (
        <div>
            <section className="box">
                <div className="container">
                    <nav className="level">
                        <div className="level-left">
                            <div className="level-item">
                                <button className="button is-danger" onClick={handleCloseClick}>
                            <span className="icon is-small">
                                <FontAwesomeIcon icon={faTimesCircle}/>
                            </span>
                                </button>
                            </div>
                        </div>
                        <p className="level-item has-text-centered">
                            Fotos da coleta
                        </p>
                    </nav>
                </div>
            </section>
            <section>
                <div className="container card-container">
                    {photos.map(photo => {
                            return <ItemPhoto
                                photo={photo}
                                key={photo.id}
                                footer={<></>}/>
                        }
                    )}
                </div>
            </section>
        </div>
    )
}