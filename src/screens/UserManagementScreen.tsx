import React from "react";
import { DashboardContentContainer } from "../components/Containers/ContentContainer";
import { DashboardContainer } from "../components/Containers/DashboardContainer";
import { ListUser } from "../components/lists/ListUser";

export function UserManagementScreen() {
	return (
		<DashboardContainer>
			<DashboardContentContainer>
				<ListUser />
			</DashboardContentContainer>
		</DashboardContainer>
	);
}
