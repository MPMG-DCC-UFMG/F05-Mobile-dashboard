import { CalendarMonth, Gite, Security } from "@mui/icons-material";
import { Container, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLoadMonthlyCollectsCount } from "../../core/network/queries/collect/queries";
import { useCountMpInspections } from "../../core/network/queries/inspection/queries";
import { useCountPublicWork } from "../../core/network/queries/publicWork/queries";
import { Card } from "./CardModel";

export function HomeCards() {
	const navigate = useNavigate();
	const { data: publicWorkCount } = useCountPublicWork();
	const { data: mpInspections } = useCountMpInspections();
	const { data: usersInspections } = useLoadMonthlyCollectsCount();

	const handleClickWorks = () => navigate("/publicWork");
	const handleClickInspections = () => navigate("/inspections");
	const handleClickQueue = () => navigate("/queue");

	return (
		<Container
			style={{ paddingRight: "0px", width: "100%", paddingTop: "36px" }}
		>
			<Grid spacing={3} container>
				<Grid item style={{ width: "33.3%" }}>
					<Card
						title="Obras cadastradas"
						icon={<Gite />}
						value={publicWorkCount ? publicWorkCount.toString() : "0"}
						iconColor="blue"
						onClick={handleClickWorks}
					/>
				</Grid>
				<Grid item style={{ width: "33.3%" }}>
					<Card
						title="Vistorias Técnicas"
						icon={<Security />}
						value={mpInspections ? mpInspections.toString() : "0"}
						iconColor="#ED0000"
						onClick={handleClickInspections}
					/>
				</Grid>
				<Grid item style={{ width: "33.3%" }}>
					<Card
						title="Vistorias Cidadãs no mês"
						icon={<CalendarMonth />}
						value={usersInspections ? usersInspections.toString() : "0"}
						iconColor="#000000"
						onClick={handleClickQueue}
					/>
				</Grid>
			</Grid>
		</Container>
	);
}
