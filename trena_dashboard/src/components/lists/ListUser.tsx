import { Delete, Edit } from "@mui/icons-material";
import {
	Grid,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { ReadUserDTO } from "../../core/models/dto/user/ReadUserDTO";
import { useLoadUsersList } from "../../core/network/queries/auth/queries";
import { SecurityServiceQuery } from "../../core/network/services/SecurityService";
import { useTableStore } from "../../core/store/table";
import { useUserStore } from "../../core/store/user";
import { AddUsersDialog } from "../Dialogs/Users/AddUsersDialog";
import { EditUserDialog } from "../Dialogs/Users/EditUserDialog";
import { Heading } from "../Heading";
import { LoadingTableData } from "../Loading/LoadingTableData";
import { TablePagination } from "../TablePagination";

export function ListUser() {
	const { isLoading } = useLoadUsersList();
	const users = useUserStore((state) => state.allUsers);
	const { rowsPerPage, setRowsPerPage } = useTableStore();

	const [addUserDialog, setOpenAddUserDialog] = useState(false);
	const [editUserDialog, setOpenEditUserDialog] = useState<boolean[]>(
		Array(users.length).fill(false)
	);
	const [page, setPage] = useState(0);

	const { mutate } = useMutation(SecurityServiceQuery.deleteUser);

	const handleUserDeleted = (username: string) => {
		mutate(username);
	};

	const handleOpenEditDialog = (index: number) => {
		setOpenEditUserDialog(
			editUserDialog.map((value, position) =>
				index === position ? true : value
			)
		);
	};

	return (
		<>
			{isLoading || !users ? (
				<LoadingTableData
					headingAction={() => setOpenAddUserDialog(true)}
					headingButtonTitle="Adicionar Usuário"
					headingTitle="Usuários"
					headingSteps={[
						{ title: "Dashboard", url: "/" },
						{ title: "Usuários", url: "/" },
					]}
				/>
			) : (
				<Grid style={{ width: "100%", marginTop: 14 }} item xs={12}>
					<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
						<Heading
							buttonTitle="Adicionar Usuário"
							title="Usuários"
							steps={[
								{ title: "Dashboard", url: "/" },
								{ title: "Usuários", url: "/" },
							]}
							handleAction={() => setOpenAddUserDialog(true)}
						>
							<AddUsersDialog
								title="Adicionar Usuário"
								state={addUserDialog}
								setState={setOpenAddUserDialog}
							/>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell align="center">Email</TableCell>
										<TableCell align="center">Função</TableCell>
										<TableCell align="center">Editar</TableCell>
										<TableCell align="center">Remover</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{users
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((user: ReadUserDTO, index: number) => (
											<TableRow hover key={user.email}>
												<TableCell align="center">{user.email}</TableCell>
												<TableCell align="center">{user.role}</TableCell>
												<TableCell align="center">
													<IconButton
														onClick={() => handleOpenEditDialog(index)}
														color="warning"
														size="small"
													>
														<Edit />
													</IconButton>
												</TableCell>
												<TableCell align="center">
													<IconButton
														onClick={() => handleUserDeleted(user.email)}
														color="error"
														size="small"
													>
														<Delete />
													</IconButton>
												</TableCell>
												<EditUserDialog
													state={editUserDialog}
													setState={setOpenEditUserDialog}
													user={user}
													index={index}
													title="Editar Usuário"
												/>
											</TableRow>
										))}
								</TableBody>
							</Table>
							<TablePagination
								rowsPerPage={rowsPerPage}
								setRowsPerPage={setRowsPerPage}
								page={page}
								setPage={setPage}
								data={users}
							/>
						</Heading>
					</Paper>
				</Grid>
			)}
		</>
	);
}
