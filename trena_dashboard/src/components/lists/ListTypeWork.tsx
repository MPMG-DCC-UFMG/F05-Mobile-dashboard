import { observer } from "mobx-react";
import { useStores } from "../../core/contexts/UseStores";
import React, { useState } from "react";
import { Search } from "../Form/Search";
import { DeleteView } from "../../screens/views/DeleteView";
import TypeWorkCRUDView from "../../screens/views/typeWork/TypeWorkCRUDView";
import { TypeWork } from "../../core/models/TypeWork";
import {
  Grid,
  Paper,
  Table,
  TableRow,
  Typography,
  Divider,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  TextField,
  DialogTitle,
  Checkbox,
  DialogActions,
} from "@mui/material";
import { Add, Close, Delete, Edit, Visibility } from "@mui/icons-material";

export const ListTypeWork = observer(() => {
  const { typeWorkStore, viewStore, typePhotoStore } = useStores();
  const [addTypeWorkDialog, setAddTypeWorkDialog] = useState(false);
  const [form, setForm] = useState<string>("");
 
  const handleSetAddTypeWorkDialog = async () => {
    await typePhotoStore.loadTypePhotoList()
    setAddTypeWorkDialog(!addTypeWorkDialog);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value;
    typeWorkStore.search(query);
  };

  const handleAddTypeWork = (name: string) =>{
        const work : TypeWork = {flag: 3, name: name, status_list: []}
        typeWorkStore.addTypeWork(work)  
  }

  const handleSubmit = () => {
    handleAddTypeWork(form);
  }

  const handleDeleteTypeWork = (typeWork: TypeWork) => {
     if(typeWork.flag){
      typeWorkStore.deleteTypeOfWork(typeWork.flag);
     }
  }

  const createTypeWorkView = (
    title: string,
    confirm: string,
    onConfirmClick: () => void,
    onChangeTypeWork: (typeWork: TypeWork) => void,
    defaultTypeWork?: TypeWork
  ) => {
    let typeWorkView = {
      title: title,
      confirmButton: confirm,
      onConfirmClick: onConfirmClick,
      contentView: (
        <TypeWorkCRUDView
          onChangeTypeWork={onChangeTypeWork}
          defaultTypeWork={defaultTypeWork}
        />
      ),
    };
    viewStore.setViewInModal(typeWorkView);
  };

  const handleEditClick = () => {
    if (typeWorkStore.selectedTypeWork) {
      let mTypeWork = typeWorkStore.selectedTypeWork;
      createTypeWorkView(
        "Editar tipo de obra",
        "Editar",
        () => {
          typeWorkStore.updateTypeWork(mTypeWork);
        },
        (typeWork: TypeWork) => {
          mTypeWork = typeWork;
        },
        mTypeWork
      );
    }
  };

  const handleDeleteClick = () => {
    if (typeWorkStore.selectedTypeWork !== undefined) {
      const typeWork = typeWorkStore.selectedTypeWork;
      let deleteView = {
        title: "Deletar Tipo de Obra",
        confirmButton: "Deletar",
        onConfirmClick: () => {
          if (typeWork.flag) {
            typeWorkStore.deleteTypeOfWork(typeWork.flag);
          }
        },
        contentView: <DeleteView toDelete={typeWork.name} />,
      };
      viewStore.setViewInModal(deleteView);
    }
  };

  return (
    <>
      <Dialog fullWidth open={addTypeWorkDialog}>
        <DialogTitle justifyContent="space-between" display="flex">
          <Typography variant="h6">Tipo de Obra</Typography>
          <IconButton onClick={handleSetAddTypeWorkDialog}>
            <Close />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <TextField 
            onChange={(event) => setForm(event.currentTarget.value)}
            required 
            label="Tipo da Obra" 
            fullWidth/>
          <Typography sx={{mt: 3}} variant="subtitle1">Tipos de Foto:</Typography>
          <TableContainer>
            <Table>
              {typePhotoStore.typePhotoList.map((options) => (
                <TableRow>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>{options.name}</TableCell>
                </TableRow>
              ))}
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleSetAddTypeWorkDialog}
            color="error" 
            variant="contained">Cancelar</Button>
          <Button 
             color="success"  
             variant="contained"
             onClick={handleSubmit}>Confirmar</Button>
        </DialogActions>
      </Dialog>

      <Grid>
        <Paper
          sx={{
            flexDirection: "column",
          }}
        >
          <Grid item display="flex" justifyContent="space-between" padding={3}>
            <Typography variant="h6">Tipos de Obras</Typography>
            <Button
              onClick={handleSetAddTypeWorkDialog}
              variant="contained"
              startIcon={<Add />}
            >
              Tipo De Obra
            </Button>
          </Grid>
          <Divider />
          <Grid item display="flex" padding={2} justifyContent="flex-Start">
            <Search label="Tipo de Obra" onTextChanged={handleSearch} />
          </Grid>
          <Divider />
          <Grid item display="flex">
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Nome</TableCell>
                    <TableCell align="center">Detalhes</TableCell>
                    <TableCell align="center">Editar</TableCell>
                    <TableCell align="center">Remover</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {typeWorkStore.typeWorksList.map((typeWork) => (
                    <TableRow hover>
                      <TableCell align="center">{typeWork.name}</TableCell>
                      <TableCell 
                        align="center"
                        key={typeWork.flag}>
                        <IconButton>
                          <Visibility />
                        </IconButton>
                      </TableCell>
                      <TableCell 
                        align="center"
                        key={typeWork.flag}>
                        <IconButton color="info">
                          <Edit />
                        </IconButton>
                      </TableCell>
                      <TableCell 
                        align="center"
                        key={typeWork.flag}>
                        <IconButton 
                          onClick={()=> handleDeleteTypeWork(typeWork)}
                          color="error">
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
});
