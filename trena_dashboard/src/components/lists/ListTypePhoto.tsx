import { Edit, Delete } from "@mui/icons-material";
import {
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useStores } from "../../core/contexts/UseStores";
import { TypePhoto } from "../../core/models/TypePhoto";
import { TypePhotoService } from "../../core/network/services/TypePhotoService";
import { AddTypeOfPhotoDialog } from "../Dialogs/TypePhoto/AddTypeOfPhotoDialog";
import { EditTypeOfPhotoDialog } from "../Dialogs/TypePhoto/EditTypeOfPhotoDialog";
import { Search } from "../Form/Search";
import { Heading } from "../Heading";
import { LoadingTableData } from "../Loading/LoadingTableData";
import { TablePagination } from "../TablePagination";

export const ListTypePhoto = observer(() => {
  const { data: typePhoto, isLoading } = useQuery(
    ["getTypePhoto"], 
    TypePhotoService.loadTypePhotos,
    {
      onSuccess: (data) => {
        setOpenEditTypePhotoDialog(Array(data.length).fill(false));
        setAtualTable(typePhotoStore.typePhotoList);
      }
    }
  );
  const { typePhotoStore, viewStore } = useStores();
  const [addTypePhotoDialog, setOpenAddTypePhotoDialog] = useState(false);
  const [editTypePhotoDialog, setOpenEditTypePhotoDialog] = useState<boolean[]>([]);
  const [atualTable, setAtualTable] = useState<TypePhoto[]>(typePhotoStore.typePhotoList);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value;
    typePhotoStore.search(query);
    setAtualTable(typePhotoStore.typePhotoList);
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
    setOpenEditTypePhotoDialog(editTypePhotoDialog.map((value, position) => 
      (position === index ? true : value)
    ))
  }

  return (
    <>
      {isLoading || !typePhoto ? (
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
                <Search label="Tipo de Foto" onTextChanged={handleSearch} />
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
                    <TableRow
                      key={typePhoto.flag}
                      hover
                      onClick={() => handleSelectPhoto(typePhoto)}
                    >
                      <TableCell>{typePhoto.name}</TableCell>
                      <TableCell>{typePhoto.description}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleOpenEditDialog(index)}
                          color="info"
                        >
                          <Edit />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
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
                      title='Editar Tipo De Foto'
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
                data={atualTable} />
            </Heading>
          </Paper>
        </Grid>
      )}
    </>
  );
});
