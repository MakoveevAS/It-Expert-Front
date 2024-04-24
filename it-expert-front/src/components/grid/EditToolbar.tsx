import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { GridRowModes, GridToolbarContainer } from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import React from 'react';
import { EditToolbarProps } from './EditToolbarProps';

export default function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        setRows(oldRows => [{ id, code: null, value: '', isNew: true }, ...oldRows]);
        setRowModesModel(oldModel => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'code' }
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer>
    );
}
