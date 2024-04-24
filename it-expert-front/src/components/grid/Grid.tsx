import * as React from 'react';
import {
    DataGrid,
    GridColDef,
    GridEventListener,
    GridRowEditStopReasons,
    GridRowModel,
    GridRowModesModel,
    GridSlots
} from '@mui/x-data-grid';
import { Container } from '@mui/material';
import { randomId } from '@mui/x-data-grid-generator';
import EditToolbar from './EditToolbar';
import { GridRow } from '../../models/GridRow';
import { GridProps } from './gridProps';

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

export default function GridComponent({ data, onDataChange }: GridProps) {
    const [rows, setRows] = React.useState<GridRow[]>(data.map(d => ({ ...d, id: randomId() })));
    const [rowModesModel, setRowModesModel] = React.useState({});

    React.useEffect(() => {
        setRows(data.map(d => ({ ...d, id: randomId() })));
    }, [data]);

    React.useEffect(() => {
        if (isNeedToSave(rows)) {
            onDataChange(rows);
        }
    }, [rows, setRows]);

    const isNeedToSave = (rows: GridRow[]): boolean => {
        const isNewRow = !!rows.find(r => r.code === null);
        const IsSame =
            data.length === rows.length &&
            data.every((d, index) => {
                const r = rows[index];
                return d.code === r.code && d.value === r.value;
            });

        return !isNewRow && !IsSame;
    };

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const processRowUpdate = (newRow: GridRowModel<GridRow>) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map(row => (row.id === newRow.id ? updatedRow : row)));

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
                        paginationModel: { page: 0, pageSize: 10 }
                    }
                }}
                pageSizeOptions={[10]}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                onRowModesModelChange={handleRowModesModelChange}
                slots={{
                    toolbar: EditToolbar as GridSlots['toolbar']
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel }
                }}
            />
        </Container>
    );
}
