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
import { Search } from "../Form/Search";
import { Heading } from "../Heading";
import { LoadingTableData } from "../Loading/LoadingTableData";
import { TablePagination } from "../TablePagination";

export const ListTypePhoto = observer(() => {
  const { data: typePhoto, isLoading } = useQuery("getTypePhoto", () =>
    TypePhotoService.loadTypePhotos()
  );
  const { typePhotoStore, viewStore } = useStores();
  const [addTypePhotoDialog, setOpenAddTypePhotoDialog] = useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value;
    typePhotoStore.search(query);
  };

  const handleSelectPhoto = (typePhoto: TypePhoto) => {
    typePhotoStore.selectTypePhoto(typePhoto);
  };

  const handleEdit = (typePhoto: TypePhoto) => {};

  const handleDeleteTypePhoto = (typePhoto: TypePhoto) => {
    if (typePhoto.flag) {
      typePhotoStore.deleteTypeOfPhoto(typePhoto.flag);
    }
  };

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
                  {typePhotoStore.typePhotoList.map((typePhoto) => (
                    <TableRow
                      key={typePhoto.flag}
                      hover
                      onClick={() => handleSelectPhoto(typePhoto)}
                    >
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
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteTypePhoto(typePhoto)}
                        >
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
      )}
    </>
  );
});
