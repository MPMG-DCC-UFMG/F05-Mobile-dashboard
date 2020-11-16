import {observer} from "mobx-react";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {useStores} from "../../core/contexts/UseStores";
import WorkStatusSelect from "./WorkStatusSelect";
import {TagList} from "../../components/lists/TagList";

export const WorkStatusBox: React.FC<any> = observer((props) => {
    const {viewStore, workStatusStore, typeWorkStore} = useStores()
    const selectedTypeWork = typeWorkStore.selectedTypeWork
    const workStatuses = typeWorkStore.typeWorkWorkStatus
    const options = workStatusStore.workStatusList

    const handleOnEditClicked = async () => {
        await workStatusStore.loadWorkStatus()
        let mSelected: number[] = []
        let workStatusSelect = {
            title: "Selecionar estados da obra",
            confirmButton: "Selecionar",
            onConfirmClick: () => {
                handleOnConfirmClicked(mSelected)
            },
            contentView:
                <WorkStatusSelect
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
            const works = new Set<number>(selectedTypeWork.status_list)
            options.forEach((value, index) => {
                    if (works.has(value.flag!)) {
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
            typeWorkStore.updateTypeWorkWorkStatus(newStatus, selectedTypeWork.flag!)
        }
    }

    return (
        <div className="panel">
            <div className="panel-heading">
                <nav className="level">
                    <div className="level-left">
                        <div className="level-item">
                            Estados das obras
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
                <TagList tags={workStatuses.map(value => value.name)}/>
            </div>
        </div>
    )
})