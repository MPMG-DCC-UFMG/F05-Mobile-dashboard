import React from "react";
import { DashboardContentContainer } from "../components/Containers/ContentContainer";
import { DashboardContainer } from "../components/Containers/DashboardContainer";
import { ListInspection } from "../components/lists/ListInspection";

export function InspectionScreen() {
	return (
		<DashboardContainer>
			<DashboardContentContainer>
				<ListInspection />
			</DashboardContentContainer>
		</DashboardContainer>
	);
}
