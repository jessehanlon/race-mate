'use client'
import { useMemo, useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
const dayjs = require('dayjs')
dayjs().format()

const AddBoat = ({ children }) => {
  const [createRaceModalOpen, setCreateRaceModalOpen] = useState(false)
  /* 
  const [raceData, setRaceData] = useState(() => dataRace);
  const [createTable, setCreateTable] = useState(false);
  const handleCreateNewRace = (raceInfo, raceValues) => {
      // removing old race
      raceData.pop();
      
      // adding new race
      raceData.push(raceValues);
      setRaceData([...raceData]);
      
      // show table
      setCreateTable(true);
  }
  */
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
        }}
        //onNewRaceSubmit={ handleCreateNewRace }
      />
    </>
  )
}

export default AddBoat

export const CreateNewRaceModal = ({ open, onClose, raceInfo, onNewRaceSubmit }) => {
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
                  //   setRaceValues({ ...raceValues, [e.target.name]: e.target.value.toUpperCase() })
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
                          if(e != null) {
                          //    handleDateChange(e);
                          }
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
          <Button color="secondary" //onClick={handleRace}
          variant="contained">
            Add Race
          </Button>
        </DialogActions>
      </Dialog>
    )
}