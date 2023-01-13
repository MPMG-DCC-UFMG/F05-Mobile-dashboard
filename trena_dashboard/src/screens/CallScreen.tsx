import React from "react";
import { DashboardContentContainer } from "../components/Containers/ContentContainer";
import { DashboardContainer } from "../components/Containers/DashboardContainer";
import { ListCalls } from "../components/lists/ListCalls";
import { ListCallsHistory } from "../components/lists/ListCallsHistory";

export function CallScreen () {
	return (
		<DashboardContainer>
			<DashboardContentContainer>
				<ListCalls />
			</DashboardContentContainer>
		</DashboardContainer>
	);
}

export function CallHistoryScreen () {
	return (
		<DashboardContainer>
			<DashboardContentContainer>
				<ListCallsHistory />
			</DashboardContentContainer>
		</DashboardContainer>
	);
}
