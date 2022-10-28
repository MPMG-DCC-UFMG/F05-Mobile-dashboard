import { Edit, Delete, Add } from "@mui/icons-material";
import {
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { observer } from "mobx-react";
import React from "react";
import { useStores } from "../../core/contexts/UseStores";
import { TypePhoto } from "../../core/models/TypePhoto";
import { DeleteView } from "../../screens/views/DeleteView";
import TypePhotoCRUDView from "../../screens/views/typePhoto/TypePhotoCRUDView";
import { Search } from "../Form/Search";

export const ListTypePhoto = observer(() => {
  const { typePhotoStore, viewStore } = useStores();

  const createTypePhotoView = (
    title: string,
    confirm: string,
    onConfirmClick: () => void,
    onChangeTypePhoto: (typePhoto: TypePhoto) => void,
    defaultTypePhoto?: TypePhoto
  ) => {
    let typePhotoView = {
      title: title,
      confirmButton: confirm,
      onConfirmClick: onConfirmClick,
      contentView: (
        <TypePhotoCRUDView
          onChangeTypePhoto={onChangeTypePhoto}
          defaultTypePhoto={defaultTypePhoto}
        />
      ),
    };
    viewStore.setViewInModal(typePhotoView);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value;
    typePhotoStore.search(query);
  };

  const handleAddClick = () => {
    let mTypePhoto: TypePhoto = { name: "" };
    createTypePhotoView(
      "Adicionar tipo de foto",
      "Adicionar",
      () => {
        typePhotoStore.addTypePhoto(mTypePhoto);
      },
      (typePhoto: TypePhoto) => {
        mTypePhoto = typePhoto;
      }
    );
  };

  const handleEditClick = () => {
    if (typePhotoStore.selectedTypePhoto) {
      let mTypePhoto = typePhotoStore.selectedTypePhoto;
      createTypePhotoView(
        "Editar tipo de foto",
        "Editar",
        () => {
          typePhotoStore.updateTypePhoto(mTypePhoto);
        },
        (typePhoto: TypePhoto) => {
          mTypePhoto = typePhoto;
        },
        mTypePhoto
      );
    }
  };

  const handleDeleteClick = () => {
    if (typePhotoStore.selectedTypePhoto !== undefined) {
      const typePhoto = typePhotoStore.selectedTypePhoto;
      let deleteView = {
        title: "Deletar tipo de foto",
        confirmButton: "Deletar",
        onConfirmClick: () => {
          if (typePhoto.flag) {
            typePhotoStore.deleteTypeOfPhoto(typePhoto.flag);
          }
        },
        contentView: <DeleteView toDelete={typePhoto.name} />,
      };
      viewStore.setViewInModal(deleteView);
    }
  };

  const handleSelectPhoto = (typePhoto: TypePhoto) => {
    typePhotoStore.selectTypePhoto(typePhoto);
  };

  const handleEdit = (typePhoto: TypePhoto) => {};

  return (
    <Grid>
      <Paper
        sx={{
          flexDirection: "column",
        }}
      >
        <Grid item display="flex" justifyContent="space-between" padding={3}>
          <Typography variant="h6">Tipos de Fotos</Typography>
          <Button variant="contained" startIcon={<Add />}>
            Tipo De Foto
          </Button>
        </Grid>
        <Divider />
        <Grid item display="flex" padding={2} justifyContent="flex-Start">
          <Search label="Tipo de Foto" onTextChanged={handleSearch} />
        </Grid>
        <Divider />
        <TableContainer>
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
              {typePhotoStore.typePhotoList.map((typePhoto) => (
                <TableRow hover onClick={() => handleSelectPhoto(typePhoto)}>
                  <TableCell>{typePhoto.name}</TableCell>
                  <TableCell>{typePhoto.description}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit(typePhoto)}
                      color="info"
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  );
});
