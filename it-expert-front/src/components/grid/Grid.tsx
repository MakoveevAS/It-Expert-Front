import * as React from 'react';
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowModel,
  GridRowModesModel,
  GridSlots,
} from '@mui/x-data-grid';
import { Container, Paper } from '@mui/material';
import { randomId } from '@mui/x-data-grid-generator';
import EditToolbar from './EditToolbar'
import { IServerData } from '../../models/IDataResponse';
import { GridRow } from '../../models/GridRow';

const columns: GridColDef[] = [
  {
    field: 'code',
    headerName: 'Code',
    type: 'number',
    width: 200,
    editable: true
  },
  {
    field: 'value',
    headerName: 'Value',
    width: 300,
    editable: true
  }
];

  export default function GridComponent(data: IServerData[]) {
    const [rows, setRows] = React.useState<GridRow[]>([]);
    const [rowModesModel, setRowModesModel] = React.useState({});

    React.useEffect(() => {
      const array: GridRow[] = Object.keys(data).map(key => 
        ({
          id: randomId(),
          ...data[key as any]
        }));
      setRows(array);
    }, [data]);

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true;
      }
    };

    const processRowUpdate = (newRow: GridRowModel<GridRow>) => {
      const updatedRow = { ...newRow, isNew: false };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

      return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
      setRowModesModel(newRowModesModel);
    };

    return (
      <Container>
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          onRowModesModelChange={handleRowModesModelChange}
          slots={{
            toolbar: EditToolbar as GridSlots['toolbar'],
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Container>
    );
  }