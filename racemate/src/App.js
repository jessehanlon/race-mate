import React, { useMemo, useState, useCallback } from 'react';
import MaterialReactTable from 'material-react-table';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { data } from "./makeData.ts"
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const App = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState(() => data);
  const [validationErrors, setValidationErrors] = useState({});


  const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);
  }

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        !window.confirm(`Are you sure you want to delete ${row.getValue('boat')}`)
      ) {
        return;
      }
      tableData.splice(row.index, 1);
      setTableData([...tableData]);

    }
  )

    const columns = useMemo(
      () => [
      {
        accessorKey: 'boat', //simple recommended way to define a column
        header: 'Boat Name',
        muiTableHeadCellProps: { sx: { color: 'green' } }, //optional custom props
        side: 100,
      },
      {
        accessorKey: 'sailNo',
        header: 'Sail Number',
        size: 60,
      },
      {
        accessorKey: 'design',
        header: 'Design',
      }, 
      {
        accessorKey: 'rating',
        header: 'PHRF Rating',
        size: 60,
      },
      {
        accessorKey: 'tcf',
        header: 'Time Correction Factor',
        size: 60,
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
        data={tableData}
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
    
        renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            Add a Boat
          </Button>
        )}
      />
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => 
          setCreateModalOpen(false)
        }
        onSubmit={handleCreateNewRow}
    
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

  const handleDateChange = (value) => {
    const finishTime = value.toString().slice(0,-3);
    const e = {target: {name:"finish", value: finishTime}};
    setValues({...values, [e.target.name]: e.target.value});
  }
  
  const inputStringInt = [columns[0], columns[1], columns[2], columns[3]];

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Add a Boat</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >

            {
            // input boat name, sail no, phrf, boat design
              inputStringInt.map((column) => (
                <TextField
                  key={column.accessorKey}
                  label={column.header}
                  name={column.accessorKey}
                  onChange={(e) => {
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }}
                />
              ))
            }

            {
            // input finish time
            <LocalizationProvider dateAdapter={AdapterDayjs} key={columns[6].index}>
              <TimeField
                key={columns[6].accessorKey}
                label={columns[6].header}
                name={columns[6].accessorKey}
                format="hh:mm ss"
                //set date as race date

                onChange={(e, context) => {
                  if(context.validationError == null) {
                  
                    handleDateChange(e)
                    console.log(e)
                  }
                }}
              /> 
            </LocalizationProvider>
            
            }

            {
            // input comments
                <TextField
                  key={columns[10].accessorKey}
                  label={columns[10].header}
                  name={columns[10].accessorKey}
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
            } 
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Add Boat
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default App;