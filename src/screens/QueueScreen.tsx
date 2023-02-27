import React from "react";
import { DashboardContentContainer } from "../components/Containers/ContentContainer";
import { DashboardContainer } from "../components/Containers/DashboardContainer";
import { ListQueue } from "../components/lists/ListQueue";

export function QueueScreen() {
	return (
		<DashboardContainer>
			<DashboardContentContainer>
				<ListQueue />
			</DashboardContentContainer>
		</DashboardContainer>
	);
}
