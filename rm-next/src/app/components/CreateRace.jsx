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
import axios from  'axios'
const dayjs = require('dayjs')
dayjs().format()

const AddRace = ({ children }) => {
  
  const [createRaceModalOpen, setCreateRaceModalOpen] = useState(false)
  
  const handleSubmit = async ({raceName, raceStart}) => {
    
    const { raceData } =  await axios.post('api/races', {
      raceName, 
      raceStart,
    })
    console.log(raceData)
    }
    
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
        open={createRaceModalOpen}
        onClose={() => {
          setCreateRaceModalOpen(false);
        }}
        onSubmit={ handleSubmit }
      />
    </>
  )
}

export default AddRace

export const CreateNewRaceModal = ({ open, onClose, onSubmit }) => {
  const defaultRaceName = ''
  const defaultRaceStart = new Date()
  const [raceName, setRaceName] = useState(defaultRaceName)
  const [raceStart, setRaceStart] = useState(defaultRaceStart)

  const handleFormSubmit = (e) => {
    e.preventDefault()
    onSubmit({ raceName, raceStart })
    onClose()
  }
  
  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create a Race</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}>
              
              {
                // input race name
                <TextField
                  key={'raceName'}
                  label={'Race Name'}
                  name={'raceName'}
                  onChange={(e) => {
                      setRaceName(e.target.value)
                  }}
                />
              }

              {
                // input race date and start time
                <LocalizationProvider dateAdapter={AdapterDayjs} key={'localizationProvider'}>
                  <DateTimePicker
                    format='MM/DD/YYYY HH:mm'
                    key={'startTime'}
                    label={'Start Time'}
                    name={'startTime'}
                    onChange={(e, context) => {
                      if(context.validationError == null) {
                          if(e != null) {
                            setRaceStart(e)
                          }
                        }
                      }}
                    /> 
                </LocalizationProvider>
                    }
                
            </Stack>
          <Button color="secondary" type="submit"
          variant="contained">
            Add Race
          </Button>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: '1.25rem' }}>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    )
}