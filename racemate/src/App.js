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
import './App.css';
const dayjs = require('dayjs');
//import dayjs from 'dayjs' // ES 2015
dayjs().format();

const App = () => {
  
  const [raceData, setRaceData] = useState(() => dataRace);
  const [createRaceModalOpen, setCreateRaceModalOpen] = useState(false);

  const [createTable, setCreateTable] = useState(false);

//  const [validationErrors, setValidationErrors] = useState({});

  const handleCreateNewRace = (raceInfo, raceValues) => {
    // removing old race
    raceData.pop();
    
    // adding new race
    raceData.push(raceValues);
    setRaceData([...raceData]);
    
    // show table
    setCreateTable(true);
  }

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

      return (
        <>
          <div id="add-race-area">
            <Button
              color="primary"
              onClick={() => setCreateRaceModalOpen(true)}
              variant="contained"
              id="new-race-btn"
                >
                  New Race
            </Button>
          </div>
            <CreateNewRaceModal
              raceInfo={raceInfo}
              open={createRaceModalOpen}
              onClose={() => {
                setCreateRaceModalOpen(false);
                
              }
              }
              onNewRaceSubmit={handleCreateNewRace}
            />
            <CreateTable
              raceData={raceData}
              show={createTable}
            />
        </>
      );
      };
      
export const CreateTable = ({raceData, show}) => {
  
  const [tableData, setTableData] = useState(() => data);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  
  const handleCreateNewRow = (values, raceData) => {

    // pulling race information
    const race = raceData.pop()
    const hours = values.finish.getHours();
    const minutes = values.finish.getMinutes();
    const seconds = values.finish.getSeconds();

    // setting up finish date
    const newDate = new Date();
    newDate.setDate(race.start.getDate());
    newDate.setMonth(race.start.getMonth());
    newDate.setFullYear(race.start.getFullYear());
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    newDate.setSeconds(seconds);    

    // setting time correction factor
    values.tcf = (650 / (550 + parseInt(values.rating))).toFixed(4);

    // calculating elapsed time
    const finishSeconds = (hours * 60 * 60) + (minutes * 60) + seconds;
    const startSeconds = (race.start.getHours() * 60 * 60) + (race.start.getMinutes() * 60) + race.start.getSeconds();
    const elapsedTotalSeconds = finishSeconds - startSeconds;     

    values.elapsed = secondsToTime(elapsedTotalSeconds);
    values.corrected_seconds = elapsedTotalSeconds * values.tcf;
    values.corrected = secondsToTime(values.corrected_seconds);

    values.place = calculatePlacings(tableData, values);

    // re-adding race to race data
    raceData.push(race);
    
    values.start = race.start.toString();
    values.finish = newDate.toString();


    tableData.push(values);
    setTableData([...tableData]);
  }

  function secondsToTime(x) {
    const h = Math.floor(x / 3600).toString().padStart(2,'0');
    const m = Math.floor(x % 3600 / 60).toString().padStart(2,'0');
    const s = Math.floor(x % 60).toString().padStart(2,'0');

    return h + ':' + m + ':' + s;
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
      size: 60,
    },
    {
      accessorKey: 'sailNo',
      header: 'Sail Number',
      size: 20,
    },
    {
      accessorKey: 'design',
      header: 'Design',
      size: 40
    }, 
    {
      accessorKey: 'rating',
      header: 'PHRF Rating',
      size: 20,
    },
    {
      accessorKey: 'tcf',
      header: 'Time Correction Factor',
      size: 40,
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
      size: 40,
    },
    {
      accessorKey: 'corrected',
      header: 'Corrected Time',
      size: 40,
    },
    {
      accessorKey: 'place',
      header: 'Finishing Place',
      size: 30,
    },
    {
      accessorKey: 'comments',
      header: 'Comments',
    }
    ],
    [],
  );
  
  function calculatePlacings(tableData, values) {
    
    const time = values.corrected_seconds;
    
    if(tableData.length === 0) {
      return 1;
    }
    
    var slowerBoats = 0;
    for(var place = 0; place < tableData.length; place++) {
      if (time < tableData[place].corrected_seconds) {
        
        // update slower boats' place
          tableData[place].place += 1;
        }
        slowerBoats += 1;
      }
    console.log('done');
    return (tableData.length - slowerBoats) + 1;
  }

  return (
    <>
    <div style={show ? {display:'block'} : {display:'none'}}>
      <div id="race-name-area">
        <div id="race-name" >{raceData[0].race}</div>
      </div>
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 40,
          },
        }}
        initialState={{ columnVisibility: { tcf: false }}}
        id={"table"}
        columns={columns}
        data={tableData}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
  //      onEditingRowSave={handleSaveRowEdits}
  //      onEditingRowCancel={handleCancelRowEdits}
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
    </div>
    </>
  )
}

export const CreateNewRaceModal = ({open, onClose, raceInfo, onNewRaceSubmit}) => {
  
  const [raceValues, setRaceValues] = useState(() => 
    raceInfo.reduce((acc, raceValue) => {
    acc[raceValue.accessorKey ?? ''] = '';
    return acc;
  }, {}),
  );
  
  const handleRace = () => {
    onNewRaceSubmit(raceInfo, raceValues);
    onClose();
  };
  
  const handleDateChange = (raceValue) => {
    const date = raceValue["$d"];
    date.setSeconds(0);
    const e = {target: {name:"start", value: date}};
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
                  setRaceValues({ ...raceValues, [e.target.name]: e.target.value.toUpperCase() })
                }}
              />
            }

            {
              // input race date and start time
              <LocalizationProvider dateAdapter={AdapterDayjs} key={raceInfo[1].index}>
                <DateTimePicker
                  format='MM/DD/YYYY HH:mm'
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
        <Button color="secondary" onClick={handleRace}
        variant="contained">
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
                format="HH:mm ss"
                onChange={(e, context) => {
                  if(context.validationError == null) {
                    setValues({ ...values, "finish": e["$d"] })
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