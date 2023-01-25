import React from "react";
import { DashboardContentContainer } from "../components/Containers/ContentContainer";
import { DashboardContainer } from "../components/Containers/DashboardContainer";
import { ListNotifications } from "../components/lists/ListNotifications";

export function NotificationScreen() {
	return (
		<DashboardContainer>
			<DashboardContentContainer>
				<ListNotifications />
			</DashboardContentContainer>
		</DashboardContainer>
	);
}
