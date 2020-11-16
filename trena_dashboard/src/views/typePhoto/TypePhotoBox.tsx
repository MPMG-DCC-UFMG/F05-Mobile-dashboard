import {observer} from "mobx-react";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {useStores} from "../../core/contexts/UseStores";
import TypePhotoSelect from "./TypePhotoSelect";
import {TagList} from "../../components/lists/TagList";

export const TypePhotoBox: React.FC<any> = observer((props) => {
    const {viewStore, typePhotoStore, typeWorkStore} = useStores()
    const selectedTypeWork = typeWorkStore.selectedTypeWork
    const typePhotos = typeWorkStore.typeWorkTypePhoto
    const options = typePhotoStore.typePhotoList

    const handleOnEditClicked = async () => {
        await typePhotoStore.loadTypePhotoList()
        let mSelected: number[] = []
        let workStatusSelect = {
            title: "Selecionar tipos de fotos",
            confirmButton: "Selecionar",
            onConfirmClick: () => {
                handleOnConfirmClicked(mSelected)
            },
            contentView:
                <TypePhotoSelect
                    options={options.map(option => option.name)}
                    onChangeSelectedOptions={(selectedOptions) => {
                        mSelected = selectedOptions
                    }}
                    defaultSelected={getSelectedIndexes()}
                />
        }
        viewStore.setViewInModal(workStatusSelect)
    }


    const getSelectedIndexes = (): number[] => {
        const selected: number[] = []
        if (selectedTypeWork) {
            const photos = new Set<number>(typePhotos.map(value => value.flag!))
            options.forEach((value, index) => {
                    if (photos.has(value.flag!)) {
                        selected.push(index)
                    }
                }
            )
        }

        return selected
    }

    const handleOnConfirmClicked = (selected: number[]) => {
        const newStatus: number[] = []
        selected.forEach((index) => {
            newStatus.push(options[index].flag!)
        })
        if (selectedTypeWork) {
            selectedTypeWork.status_list = newStatus
            typeWorkStore.updateTypeWorkTypePhoto(newStatus, selectedTypeWork.flag!)
        }
    }

    return (
        <div className="panel">
            <div className="panel-heading">
                <nav className="level">
                    <div className="level-left">
                        <div className="level-item">
                            Tipos de fotos
                        </div>
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            <button className="button is-info" onClick={handleOnEditClicked}
                                    disabled={!selectedTypeWork}>
                                <span className="icon is-small">
                                    <FontAwesomeIcon icon={faEdit}/>
                                </span>
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="panel-block" style={{
                minHeight: 250,
            }}>
                <TagList tags={typePhotos.map(value => value.name)}/>
            </div>
        </div>
    )
})