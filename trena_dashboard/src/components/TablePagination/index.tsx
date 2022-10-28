import { TablePagination as MuiTablePagination } from "@mui/material";
import React, { useState } from "react";

interface TablePaginationProps {
  data: any[];
}

export function TablePagination({ data }: TablePaginationProps) {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

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
      rowsPerPageOptions={[5, 10, 15]}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
