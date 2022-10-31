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
  Box, 
  LinearProgress
} from "@mui/material";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useStores } from "../../core/contexts/UseStores";
import { TypePhoto } from "../../core/models/TypePhoto";
import { TypePhotoService } from "../../core/network/services/TypePhotoService";
import { DeleteView } from "../../screens/views/DeleteView";
import TypePhotoCRUDView from "../../screens/views/typePhoto/TypePhotoCRUDView";
import { Search } from "../Form/Search";
import { Heading } from "../Heading";
import { TablePagination } from "../TablePagination";

export const ListTypePhoto = observer(() => {

  const { data: typePhoto, isLoading } = useQuery("getTypePhoto", () =>
    TypePhotoService.loadTypePhotos(),
  );
  const { typePhotoStore, viewStore } = useStores();
  const [addTypePhotoDialog, setOpenAddTypePhotoDialog] = useState(false);
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

  if (isLoading) {
    return (
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
            <Box width="100%">
              <LinearProgress />
            </Box>
          </Heading>
        </Paper>
      </Grid>
    );
  }

  if (!typePhoto) {
    return <h1>Is loading...</h1>;
  }

  return (
    <>
    <Grid style={{ width: "100%", marginTop: 14 }} item xs={12}>
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Heading 
             buttonTitle = "Adicionar Tipo de Foto"
             title="Tipos de Fotos" 
             steps={[
               {title:"Dashboard",url:"/"},
               {title:"Tipos de Fotos",url:"/"}
             ]} 
             handleAction={() => setOpenAddTypePhotoDialog(true)}
        >
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
          <TablePagination data={typePhoto} />
        </Heading>
      </Paper>
    </Grid>
    </>
  );
});
