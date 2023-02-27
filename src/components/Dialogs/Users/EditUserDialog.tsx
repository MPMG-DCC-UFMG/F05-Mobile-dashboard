import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { CreateUserDTO } from "../../../core/models/dto/user/CreateUserDTO";
import { ReadUserDTO } from "../../../core/models/dto/user/ReadUserDTO";
import { TableDialogContainer } from "../DialogContainer";

interface EditUserDialog {
	state: boolean[];
	setState(state: boolean[]): void;
	user: ReadUserDTO;
	index: number;
	title: string;
}

export function EditUserDialog({
	state,
	setState,
	user,
	index,
	title,
}: EditUserDialog) {
	const [editUser, setEditUser] = useState<CreateUserDTO>({} as CreateUserDTO);
	const handleCloseDialog = (index: number) => {
		setState(
			state.map((value, position) => (position === index ? false : value))
		);
	};

	return (
		<TableDialogContainer
			state={state}
			setState={setState}
			index={index}
			title={title}
		>
			<Grid container justifyContent="space-between" alignItems="center">
				<TextField
					onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
					required
					label="Email do Usuário"
					defaultValue={user.email}
					fullWidth
				/>
				<TextField
					onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
					required
					label="Função do Usuário"
					defaultValue={user.role}
					fullWidth
					sx={{ mt: 2 }}
				/>
				<TextField
					onChange={(e) =>
						setEditUser({ ...editUser, authentication: e.target.value })
					}
					required
					label="Senha do Usuário"
					defaultValue={editUser.authentication}
					fullWidth
					sx={{ mt: 2 }}
				/>
				<Grid
					container
					spacing={2}
					sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
				>
					<Grid item display="flex">
						<Button
							onClick={() => handleCloseDialog(index)}
							color="error"
							variant="contained"
						>
							Cancelar
						</Button>
					</Grid>
					<Grid item display="flex">
						<Button
							onClick={() => handleCloseDialog(index)}
							color="success"
							variant="contained"
						>
							Salvar
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</TableDialogContainer>
	);
}
