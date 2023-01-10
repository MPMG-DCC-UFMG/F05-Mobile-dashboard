import { Delete, Edit, ManageSearch } from "@mui/icons-material";
import {
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useStores } from "../../core/contexts/UseStores";
import { TypePhoto } from "../../core/models/TypePhoto";
import { TypePhotoService } from "../../core/network/services/TypePhotoService";
import { AddTypeOfPhotoDialog } from "../Dialogs/TypePhoto/AddTypeOfPhotoDialog";
import { EditTypeOfPhotoDialog } from "../Dialogs/TypePhoto/EditTypeOfPhotoDialog";
import { Heading } from "../Heading";
import { LoadingTableData } from "../Loading/LoadingTableData";
import { TablePagination } from "../TablePagination";

export const ListTypePhoto = observer(() => {
  const { data: typePhotos, isLoading } = useQuery(
    ["getTypePhoto"],
    TypePhotoService.loadTypePhotos,
    {
      onSuccess: (data) => {
        setOpenEditTypePhotoDialog(Array(data.length).fill(false));
        setAtualTable(data);
      },
    }
  );
  const { typePhotoStore } = useStores();
  const [addTypePhotoDialog, setOpenAddTypePhotoDialog] = useState(false);
  const [editTypePhotoDialog, setOpenEditTypePhotoDialog] = useState<boolean[]>(
    []
  );
  const [atualTable, setAtualTable] = useState<TypePhoto[]>(typePhotos!);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSearch = (value?: string) => {
    if (value) {
      setAtualTable(
        typePhotos!.filter((item) =>
          item.name.toUpperCase().includes(value.toUpperCase())
        )
      );
    } else {
      setAtualTable(typePhotos!);
    }
  };

  const handleSelectPhoto = (typePhoto: TypePhoto) => {
    typePhotoStore.selectTypePhoto(typePhoto);
  };

  const handleDeleteTypePhoto = (typePhoto: TypePhoto) => {
    if (typePhoto.flag) {
      typePhotoStore.deleteTypeOfPhoto(typePhoto.flag);
    }
  };

  const handleOpenEditDialog = (index: number) => {
    setOpenEditTypePhotoDialog(
      editTypePhotoDialog.map((value, position) =>
        position === index ? true : value
      )
    );
  };

  return (
    <>
      {isLoading || !typePhotos ? (
        <LoadingTableData
          headingAction={() => setOpenAddTypePhotoDialog(true)}
          headingTitle="Tipo de Foto"
          headingButtonTitle="Adicionar Tipo de Foto"
          headingSteps={[
            { title: "Dashboard", url: "/" },
            { title: "Estado das Obras", url: "/" },
          ]}
        />
      ) : (
        <Grid style={{ width: "100%", marginTop: 14 }} item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Heading
              buttonTitle="Adicionar Tipo de Foto"
              title="Tipos de Fotos"
              steps={[
                { title: "Dashboard", url: "/" },
                { title: "Tipos de Fotos", url: "/" },
              ]}
              handleAction={() => setOpenAddTypePhotoDialog(true)}
            >
              <AddTypeOfPhotoDialog
                state={addTypePhotoDialog}
                setState={setOpenAddTypePhotoDialog}
                title="Adicionar tipo de foto"
              />
              <Grid item display="flex" padding={2} justifyContent="flex-Start">
                <TextField
                  fullWidth
                  size="small"
                  onChange={(e) => handleSearch(e.target.value)}
                  label="Tipo de Foto"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ManageSearch />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Divider />
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Descrição</TableCell>
                    <TableCell>Editar</TableCell>
                    <TableCell>Remover</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {atualTable
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((typePhoto: TypePhoto, index: number) => (
                      <React.Fragment key={typePhoto.flag!}>
                        <TableRow
                          hover
                          onClick={() => handleSelectPhoto(typePhoto)}
                        >
                          <TableCell>{typePhoto.name}</TableCell>
                          <TableCell>{typePhoto.description}</TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => handleOpenEditDialog(index)}
                              color="warning"
                              size="small"
                            >
                              <Edit />
                            </IconButton>
                          </TableCell>
                          <TableCell>
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => handleDeleteTypePhoto(typePhoto)}
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                          <EditTypeOfPhotoDialog
                            state={editTypePhotoDialog}
                            setState={setOpenEditTypePhotoDialog}
                            typePhoto={typePhoto}
                            index={index}
                            title="Editar Tipo De Foto"
                          />
                        </TableRow>
                      </React.Fragment>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                page={page}
                setPage={setPage}
                data={atualTable}
              />
            </Heading>
          </Paper>
        </Grid>
      )}
    </>
  );
});
