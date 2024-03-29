import React from "react";
import { DashboardContentContainer } from "../components/Containers/ContentContainer";
import { DashboardContainer } from "../components/Containers/DashboardContainer";
import { ListWorkStatus } from "../components/lists/ListWorkStatus";

export function WorkStatusScreen() {
	return (
		<DashboardContainer>
			<DashboardContentContainer>
				<ListWorkStatus />
			</DashboardContentContainer>
		</DashboardContainer>
	);
}
