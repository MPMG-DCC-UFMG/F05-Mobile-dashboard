import React from "react";
import {ListPublicWork} from "../components/lists/ListPublicWork";
import {useStores} from "../core/contexts/UseStores";
import {PublicWorkView} from "./views/publicWork/PublicWorkView";
import { Row, Col } from "reactstrap";

interface PublicWorkScreenProps {

}

export const PublicWorkScreen: React.FC<PublicWorkScreenProps> = (props) => {
    const {publicWorkStore, typeWorkStore, inspectionStore} = useStores()
    
    publicWorkStore.loadPublicWorkList()
    typeWorkStore.loadTypeWorkList()
   

    return (
        <Col>
            <Row>
                <ListPublicWork/>
            </Row>
            <Row>
                <PublicWorkView/>
            </Row>
        </Col>
    )
}