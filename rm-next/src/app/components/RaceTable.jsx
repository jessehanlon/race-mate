'use client'
import { useMemo, useState } from 'react'
import MaterialReactTable from 'material-react-table'
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
} from '@mui/material'
import { Delete } from '@mui/icons-material'

const Table = ( { children }) => {

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

export default RaceTable