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
import { data, dataRace } from "./makeData.ts"
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const App = () => {
  
  const [raceData, setRaceData] = useState(() => dataRace);
  const [tableData, setTableData] = useState(() => data);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createRaceModalOpen, setCreateRaceModalOpen] = useState(false);

//  const [validationErrors, setValidationErrors] = useState({});

  

  const handleCreateNewRow = (values, raceData) => {
    values.start = raceData.pop().start.toString();
    values.tcf = (650 / (550 + values.rating)).toFixed(3);
    tableData.push(values);
    setTableData([...tableData]);
  }

  const handleCreateNewRace = (raceValues) => {
    console.log(raceValues);
    raceData.push(raceValues);
    setRaceData([...raceData]);
    console.log(raceData);
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

    const raceInfo = useMemo(
      () => [
        {
          accessorKey: 'race',
          header: 'Race Name',
        },
        {
          accessorKey: 'start',
          header: 'Start Time',
        }
      ]
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
      <Button
        color="secondary"
        onClick={() => setCreateRaceModalOpen(true)}
        variant="contained"
          >
            Create a Race
      </Button>
      <CreateNewRaceModal
        raceInfo={raceInfo}
        open={createRaceModalOpen}
        onClose={() => 
          setCreateRaceModalOpen(false)
        }
        onNewRaceSubmit={handleCreateNewRace}
      />

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
        raceData={raceData}
        onSubmit={handleCreateNewRow}
    
      />
    </>
    );
  };

export const CreateNewRaceModal = ({open, onClose, raceInfo, onNewRaceSubmit}) => {
  
  const [raceValues, setRaceValues] = useState(() => 
    raceInfo.reduce((acc, raceValue) => {
    acc[raceValue.accessorKey ?? ''] = '';
    return acc;
  }, {}),

  );

  const handleRace = () => {
    onNewRaceSubmit(raceValues);
    onClose();
  };

  const handleDateChange = (raceValue) => {
    const start = raceValue.toString().slice(0,-3);
    const e = {target: {name:"start", value: start}};
    setRaceValues({...raceValues, [e.target.name]: e.target.value});
  }

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create a Race</DialogTitle>
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
              // input race name
              <TextField
                key={raceInfo[0].accessorKey}
                label={raceInfo[0].header}
                name={raceInfo[0].accessorKey}
                onChange={(e) => {
                  setRaceValues({ ...raceValues, [e.target.name]: e.target.value })
                }}
              />
            }

            {
              // input race date and start time
              <LocalizationProvider dateAdapter={AdapterDayjs} key={raceInfo[1].index}>
                <DateTimePicker
                  key={raceInfo[1].accessorKey}
                  label={raceInfo[1].header}
                  name={raceInfo[1].accessorKey}
                  onChange={(e, context) => {
                    if(context.validationError == null) {
                      handleDateChange(e)
                    }
                  }}
                /> 
              </LocalizationProvider>
            }
            
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleRace} variant="contained">
          Add Race
        </Button>
      </DialogActions>
    </Dialog>
  ); 

}

export const CreateNewAccountModal = ({ open, columns, onClose, raceData, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ''] = '';
      return acc;
    }, {}),
  );

  const handleSubmit = () => {
    onSubmit(values, raceData);
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
                onChange={(e, context) => {
                  if(context.validationError == null) {
                  
                    handleDateChange(e)
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