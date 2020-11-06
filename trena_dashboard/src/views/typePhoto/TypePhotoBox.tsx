import {observer} from "mobx-react";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {useStores} from "../../core/contexts/UseStores";
import TypePhotoSelect from "./TypePhotoSelect";

export const TypePhotoBox: React.FC<any> = observer((props) => {
    const {viewStore, typePhotoStore, typeWorkStore} = useStores()
    const selectedTypeWork = typeWorkStore.selectedTypeWork

    const handleOnEditClicked = async () => {
        await typePhotoStore.loadTypePhotoList()
        const options = typePhotoStore.typePhotoList
        let mSelected = []
        let workStatusSelect = {
            title: "Selecionar tipos de fotos",
            confirmButton: "Selecionar",
            onConfirmClick: () => {

            },
            contentView:
                <TypePhotoSelect
                    options={options.map(option => option.name)}
                    onChangeSelectedOptions={(selectedOptions) => {
                        mSelected = selectedOptions
                    }}
                />
        }
        viewStore.setViewInModal(workStatusSelect)
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
            </div>
        </div>
    )
})