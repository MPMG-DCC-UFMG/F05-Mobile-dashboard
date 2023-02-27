import { TablePagination as MuiTablePagination } from "@mui/material";
import React from "react";

interface TablePaginationProps {
  rowsPerPage: number;
  setRowsPerPage(rows: number): void;
  page: number;
  setPage(page: number): void;
  data: any[];
}

export function TablePagination({
	data,
	rowsPerPage,
	setRowsPerPage,
	page,
	setPage,
}: TablePaginationProps) {
	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
		page: number
	) => {
		setPage(page);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setRowsPerPage(parseInt(event.target.value));
		setPage(0);
	};

	return (
		<MuiTablePagination
			component="div"
			sx={{ justifyContent: "flex-end" }}
			count={data.length}
			page={page}
			labelRowsPerPage="Dados por página"
			rowsPerPage={rowsPerPage}
			rowsPerPageOptions={[10, 15, 20]}
			onPageChange={handleChangePage}
			onRowsPerPageChange={handleChangeRowsPerPage}
		/>
	);
}
