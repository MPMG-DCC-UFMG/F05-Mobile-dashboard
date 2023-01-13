import { Construction, Map } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React from "react";
import { PublicWork } from "../../core/models/PublicWork";
import { addressFormatter } from "../../utils/mapper";
import { InfoTextField } from "../Inputs/InfoTextField";
import { Map as MapComponent } from "../Map";

interface PublicWorkMapViewProps {
  publicWork: PublicWork;
}

export function PublicWorkMapView({ publicWork }: PublicWorkMapViewProps) {
	return (
		<Grid container justifyContent="space-between" alignItems="center">
			<InfoTextField
				disabled
				defaultValue={publicWork.name}
				icon={<Construction />}
				label="Obra Pública"
				sx={{ width: "49%" }}
			/>
			<InfoTextField
				disabled
				defaultValue={addressFormatter(publicWork.address)}
				icon={<Map />}
				label="Endereço"
				sx={{ width: "49%" }}
			/>
			<MapComponent
				latitude={publicWork.address.latitude}
				longitude={publicWork.address.longitude}
				zoom={15}
			/>
		</Grid>
	);
}
