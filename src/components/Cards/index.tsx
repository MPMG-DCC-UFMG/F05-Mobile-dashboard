import { CalendarMonth, Gite, Security } from "@mui/icons-material";
import { Container, Grid } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../core/contexts/ThemeContext";
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
    const {isDark} = useContext(ThemeContext);

	return (
		<Container
			style={{ paddingRight: "0px", width: "100%", paddingTop: "36px" }}
		>
			<Grid spacing={3} container>
				<Grid item style={{ width: "33.3%" }}>
					<Card
						title="Obras cadastradas"
						icon={<Gite sx={{color: '#fff'}}/>}
						value={publicWorkCount ? publicWorkCount.toString() : "0"}
						iconColor="#1565c0"
						onClick={handleClickWorks}
					/>
				</Grid>
				<Grid item style={{ width: "33.3%" }}>
					<Card
						title="Vistorias Técnicas"
						icon={<Security  sx={{color: '#fff'}}/>}
						value={mpInspections ? mpInspections.toString() : "0"}
						iconColor="#d32f2f"
						onClick={handleClickInspections}
					/>
				</Grid>
				<Grid item style={{ width: "33.3%" }}>
					<Card
						title="Vistorias Cidadãs no mês"
						icon={<CalendarMonth sx={{color: '#fff'}}/>}
						value={usersInspections ? usersInspections.toString() : "0"}
						iconColor="#2e7d32"
						onClick={handleClickQueue}
					/>
				</Grid>
			</Grid>
		</Container>
	);
}
