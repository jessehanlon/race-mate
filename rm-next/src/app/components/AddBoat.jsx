import {
Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from "@mui/material"
import { TimeField } from "@mui/x-date-pickers/TimeField"


export const AddBoat = ({ children, columns, open, onClose, onSubmit }) => {
  inputStringInt = [columns[0], columns[1], columns[2], columns[3]]

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Boat</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
          {
          // input boat name, sail number, phrf, design
            inputStringInt.map((column) => {
              <TextField
                label={column.header}
                name={column.accessorKey}
                key={column.accessorKey}
                onChange={(e) => {
                  null
                }}/>
            })
          }
          {
            // input finish time
            <TimeField
              label={columns[6].header}
              name={columns[6].accessorKey}
              key={columns[6].accessorKey}
              format="HH:mm ss"
              onChange={(e) => {
                if(TabContext.validationError == null) {
                  null
                }
              }}
              />
          }
          {
            // input comments
            <TextField
              label={columns[10].header}
              name={columns[10].accessorKey}
              key={columns[10].accessorKey}
              onChange={(e) => {
                null
              }
              }/>
          }
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={onSubmit} variant="contained">
          Add Boat
        </Button>
      </DialogActions>
    </Dialog>        
    )
}