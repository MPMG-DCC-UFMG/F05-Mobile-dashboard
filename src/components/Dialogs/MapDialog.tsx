import { LocationCity, Public } from "@material-ui/icons";
import {
	HolidayVillage,
	LocationOn,
	NearMe,
	Numbers,
} from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import React from "react";
import { PublicWork } from "../../core/models/PublicWork";
import { formatCep } from "../../utils/mapper";
import { InfoTextField } from "../Inputs/InfoTextField";
import { Map } from "../Map";
import { TableDialogContainer } from "./DialogContainer";

interface MapDialogProps {
	state: boolean[];
	setState(state: boolean[]): void;
	publicWork: PublicWork;
	index: number;
	fullScreen?: boolean;
}

export function MapDialog({
	state,
	setState,
	publicWork,
	index,
	fullScreen,
}: MapDialogProps) {
	return (
		<TableDialogContainer
			state={state}
			setState={setState}
			index={index}
			title={`Localização - ${publicWork.name}`}
			fullScreen={fullScreen}
		>
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<InfoTextField
					disabled
					defaultValue={publicWork.address.city}
					icon={<LocationCity />}
					label="Cidade"
				/>
				<InfoTextField
					disabled
					defaultValue={formatCep(publicWork.address.cep)}
					icon={<Public />}
					label="CEP"
				/>
				<InfoTextField
					disabled
					defaultValue={publicWork.address.state}
					icon={<LocationOn />}
					label="UF"
				/>
				<InfoTextField
					disabled
					defaultValue={publicWork.address.neighborhood}
					icon={<HolidayVillage />}
					label="Bairro"
				/>
				<InfoTextField
					disabled
					defaultValue={publicWork.address.street}
					icon={<NearMe />}
					label="Rua"
				/>
				<InfoTextField
					disabled
					defaultValue={publicWork.address.number}
					icon={<Numbers />}
					label="Logradouro"
				/>
			</Box>

			<Grid container style={{ width: "100%", height: "100%" }}>
				<Map
					latitude={publicWork.address.latitude}
					longitude={publicWork.address.longitude}
					zoom={15}
				/>
			</Grid>
		</TableDialogContainer>
	);
}
