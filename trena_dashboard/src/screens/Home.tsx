import React from "react";
import { HomeCards } from "../components/Cards";
import { DashboardContentContainer } from "../components/Containers/ContentContainer";
import { DashboardContainer } from "../components/Containers/DashboardContainer";

export function Home() {
	return (
		<DashboardContainer>
			<DashboardContentContainer>
				<HomeCards />
			</DashboardContentContainer>
		</DashboardContainer>
	);
}
