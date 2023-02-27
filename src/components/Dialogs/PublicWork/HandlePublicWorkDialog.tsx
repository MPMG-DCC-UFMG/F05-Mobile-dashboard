import { Public } from "@material-ui/icons";
import {
	Engineering,
	ExpandMore,
	HolidayVillage,
	LocationCity,
	LocationOn,
	NearMe,
	Numbers,
	TextFields,
} from "@mui/icons-material";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Autocomplete,
	Box,
	Button,
	CircularProgress,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import { InfoTextField } from "../../Inputs/InfoTextField";
import { TableDialogContainer, TableDialogProps } from "../DialogContainer";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { PublicWork } from "../../../core/models/PublicWork";
import { TypeWork } from "../../../core/models/TypeWork";
import { PublicWorkServiceQuery } from "../../../core/network/services/PublicWorkService";
import { TypeWorkServiceQuery } from "../../../core/network/services/TypeWorkService";
import { Notify } from "../../Toast/Notify";

interface HandlePublicWorkDialogProps extends TableDialogProps {
	mode: "edit" | "delete";
	publicWork: PublicWork;
}

export function HandlePublicWorkDialog({
	state,
	setState,
	title,
	index,
	mode,
	publicWork,
	fullScreen,
}: HandlePublicWorkDialogProps) {
	const queryClient = useQueryClient();
	const { data: typeWorks } = useQuery<TypeWork[]>(
		["getTypeWorks", publicWork.id],
		() => TypeWorkServiceQuery.loadTypeWorks()
	);

	const [newPublicWork, setNewPublicWork] = useState<PublicWork>(publicWork);
	const [selectedTypeWork, setSelectedTypeWork] = useState<number>(
		publicWork.type_work_flag
	);

	const { mutate: editMutate, isLoading: editLoading } = useMutation(
		PublicWorkServiceQuery.updatePublicWork
	);

	const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation(
		PublicWorkServiceQuery.deletePublicWork
	);

	const publicWorkTypeWork =
		typeWorks &&
		typeWorks.find((typework) => typework.flag === publicWork.type_work_flag);

	const canSaveChanges =
		JSON.stringify(publicWork) === JSON.stringify(newPublicWork) ||
		publicWorkTypeWork?.flag !== selectedTypeWork;

	const handleSubmitChanges = () => {
		mode === "edit"
			? editMutate(
					{
						name: newPublicWork.name,
						type_work_flag: selectedTypeWork,
						id: publicWork.id,
						address: {
							...newPublicWork.address,
							state: "MG",
						},
						queue_status: newPublicWork.queue_status,
						queue_status_date: newPublicWork.queue_status_date,
					},
					{
						onError: () => {
							Notify(
								"Erro ao Salvar alterações! Verifique o servidor",
								"bottom-left",
								"warning"
							);
						},
						onSuccess: () => {
							Notify("Obra Atualizada com sucesso!", "bottom-left", "success");
							queryClient.invalidateQueries("getPublicWorks");
							setState(state.map((s, pos) => (pos === index ? false : s)));
						},
					}
			  )
			: deleteMutate(publicWork.id, {
					onError: () => {
						Notify(
							"Erro ao deletar obra! Verifique o servidor!",
							"bottom-left",
							"error"
						);
						setState(state.map((s, pos) => (pos === index ? false : s)));
						queryClient.invalidateQueries("getPublicWorks");
					},
					onSuccess: () => {
						Notify("Obra deletada com sucesso!", "bottom-left", "success");
						queryClient.invalidateQueries("getPublicWorks");
						setState(state.map((s, pos) => (pos === index ? false : s)));
					},
			  });
	};

	return (
		<TableDialogContainer
			fullScreen={fullScreen}
			state={state}
			setState={setState}
			title={title}
			index={index}
		>
			<InfoTextField
				disabled={mode === "delete"}
				label="Nome"
				fullWidth
				defaultValue={newPublicWork.name}
				onChange={(e) =>
					setNewPublicWork({ ...newPublicWork, name: e.target.value })
				}
				icon={<TextFields />}
			/>
			{mode === "edit" && typeWorks ? (
				<Autocomplete
					sx={{ mt: 2 }}
					disablePortal
					fullWidth
					defaultValue={publicWorkTypeWork}
					renderInput={(params) => (
						<TextField {...params} label="Tipo de Obra" />
					)}
					getOptionLabel={(option) => option.name}
					options={typeWorks}
					onChange={(e, value) =>
						setSelectedTypeWork(value ? value.flag! : publicWork.type_work_flag)
					}
				/>
			) : (
				<InfoTextField
					defaultValue={publicWorkTypeWork?.name}
					icon={<Engineering />}
					label="Tipo de Obra"
					fullWidth
					disabled
				/>
			)}

			<Accordion sx={{ width: "100%", mt: 2 }}>
				<AccordionSummary expandIcon={<ExpandMore />}>
					<Typography>Endereço</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
					>
						<InfoTextField
							required
							disabled={mode === "delete"}
							icon={<LocationCity />}
							label="Cidade"
							defaultValue={newPublicWork.address.city}
							onChange={(e) =>
								setNewPublicWork({
									...newPublicWork,
									address: { ...newPublicWork.address, city: e.target.value },
								})
							}
						/>
						<InfoTextField
							required
							disabled={mode === "delete"}
							icon={<Public />}
							label="CEP"
							defaultValue={newPublicWork.address.cep}
							onChange={(e) =>
								setNewPublicWork({
									...newPublicWork,
									address: { ...newPublicWork.address, cep: e.target.value },
								})
							}
						/>
						<InfoTextField
							required
							disabled
							value="MG"
							icon={<LocationOn />}
							label="UF"
						/>
						<InfoTextField
							required
							disabled={mode === "delete"}
							defaultValue={newPublicWork.address.neighborhood}
							icon={<HolidayVillage />}
							label="Bairro"
							onChange={(e) =>
								setNewPublicWork({
									...newPublicWork,
									address: {
										...newPublicWork.address,
										neighborhood: e.target.value,
									},
								})
							}
						/>
						<InfoTextField
							required
							disabled={mode === "delete"}
							defaultValue={newPublicWork.address.street}
							icon={<NearMe />}
							label="Rua"
							onChange={(e) =>
								setNewPublicWork({
									...newPublicWork,
									address: {
										...newPublicWork.address,
										street: e.target.value,
									},
								})
							}
						/>
						<InfoTextField
							disabled={mode === "delete"}
							defaultValue={newPublicWork.address.number}
							icon={<Numbers />}
							label="Logradouro"
							onChange={(e) =>
								setNewPublicWork({
									...newPublicWork,
									address: {
										...newPublicWork.address,
										number: e.target.value,
									},
								})
							}
						/>
					</Box>

					<InfoTextField
						fullWidth
						disabled={mode === "delete"}
						defaultValue={newPublicWork.address.latitude.toString()}
						icon={<Numbers />}
						label="Latitude"
						onChange={(e) =>
							setNewPublicWork({
								...newPublicWork,
								address: {
									...newPublicWork.address,
									latitude: Number(e.target.value),
								},
							})
						}
					/>
					<InfoTextField
						fullWidth
						disabled={mode === "delete"}
						defaultValue={newPublicWork.address.longitude.toString()}
						icon={<Numbers />}
						label="Longitude"
						onChange={(e) =>
							setNewPublicWork({
								...newPublicWork,
								address: {
									...newPublicWork.address,
									longitude: Number(e.target.value),
								},
							})
						}
					/>
				</AccordionDetails>
			</Accordion>
			<Grid sx={{ mt: 2 }} item display="flex" justifyContent="flex-end">
				{mode === "edit" ? (
					<Button
						disabled={editLoading}
						variant="contained"
						color="success"
						onClick={handleSubmitChanges}
					>
						{editLoading ? <CircularProgress size={40} /> : "Salvar"}
					</Button>
				) : (
					<Button
						disabled={deleteLoading}
						variant="contained"
						color="error"
						onClick={handleSubmitChanges}
					>
						{deleteLoading ? <CircularProgress size={25} /> : "Deletar"}
					</Button>
				)}
			</Grid>
		</TableDialogContainer>
	);
}
