import React from "react";
import { DashboardContentContainer } from "../components/Containers/ContentContainer";
import { DashboardContainer } from "../components/Containers/DashboardContainer";
import { ListTypePhoto } from "../components/lists/ListTypePhoto";

export function TypePhotoScreen() {
	return (
		<DashboardContainer>
			<DashboardContentContainer>
				<ListTypePhoto />
			</DashboardContentContainer>
		</DashboardContainer>
	);
}
