import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import MaterialReactTable from 'material-react-table';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { data } from "./makeData.ts"

const App = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState(() => data);
  const [validationErrors, setValidationErrors] = useState({});


  const handleCreateNewRow = (values) => {

    tableData.push(values);
    //TODO:
      // create a set of full values from input to 
      // update table data
    setTableData(...tableData);
  }

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        !window.confirm(`Are you sure you want to delete ${row.getValue('boat')}`)
      ) {
        return;
      }
      tableData.splice(row.index, 1);
      setTableData(...tableData);

    }
  )

    const columns = useMemo(
      () => [
      {
        accessorKey: 'boat', //simple recommended way to define a column
        header: 'Boat',
        muiTableHeadCellProps: { sx: { color: 'green' } }, //optional custom props
        Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
      },
      {
        accessorKey: 'sailNo',
        header: 'Sail Number',
      },
      {
        accessorKey: 'design',
        header: 'Design',
      }, 
      {
        accessorKey: 'rating',
        header: 'Rating',
      },
      {
        accessorKey: 'tcf',
        header: 'Time Correction Factor',
      },
      {
        accessorKey: 'start',
        header: 'Start Time',
      },
      {
        accessorKey: 'finish',
        header: 'Finish Time',
      },
      {
        accessorKey: 'elapsed',
        header: 'Elapsed Time',
      },
      {
        accessorKey: 'corrected',
        header: 'Corrected Time',
      },
      {
        accessorKey: 'place',
        header: 'Finishing Place',
      },
      {
        accessorKey: 'comments',
        header: 'Comments',
      }
      ],
      [],
    );

    //optionally, you can manage any/all of the table state yourself
    const [rowSelection, setRowSelection] = useState({});

    useEffect(() => {
    //do something when the row selection changes
    }, [rowSelection]);

    //Or, optionally, you can get a reference to the underlying table instance
    const tableInstanceRef = useRef(null);

    const someEventHandler = () => {
    //read the table state during an event from the table instance ref
    console.log(tableInstanceRef.current.getState().sorting);
    }

    return (
      <>
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 80,
          },
        }}
        columns={columns}
        data={data}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
    //    onEditingRowSave={handleSaveRowEdits}
    //    onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
    /*
        renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            Create New Account
          </Button>
        )}
      />
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
    */
      />
    </>
    );
  };


export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
const [values, setValues] = useState(() =>
columns.reduce((acc, column) => {
  acc[column.accessorKey ?? ''] = '';
  return acc;
}, {}),
);
const handleSubmit = () => {
  onSubmit(values);
  onClose();
};

return (
  <Dialog open={open}>
    <DialogTitle textAlign="center">Create New Account</DialogTitle>
    <DialogContent>
      <form onSubmit={(e) => e.preventDefault()}>
        <Stack
          sx={{
            width: '100%',
            minWidth: { xs: '300px', sm: '360px', md: '400px' },
            gap: '1.5rem',
          }}
        >
          {columns.map((column) => (
            <TextField
              key={column.accessorKey}
              label={column.header}
              name={column.accessorKey}
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          ))}
        </Stack>
      </form>
    </DialogContent>
    <DialogActions sx={{ p: '1.25rem' }}>
      <Button onClick={onClose}>Cancel</Button>
      <Button color="secondary" onClick={handleSubmit} variant="contained">
        Create New Account
      </Button>
    </DialogActions>
  </Dialog>
);
}

export default App;