import React from "react";
import {
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  TextField,
  // MenuItem,
  // Select,
  // InputLabel,
  // FormControl,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { useSelector, useDispatch } from "react-redux";
import { addComment } from "../../../actions/membersActions";

export default function AddCommentDialog(props) {
  const dispatch = useDispatch();
  const selectedVolunteer = useSelector(
    (state) => state.volunteers.selectedVolunteer
  );

  const [comment, setComment] = React.useState();
  const [date, setDate] = React.useState(new Date());

  const handleSubmit = () => {
    dispatch(addComment(selectedVolunteer._id, date, comment));

    props.handleClose();
  };

  const handleDiscard = () => {
    props.handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        maxWidth="xs"
        fullWidth={true}
      >
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    disabled
                    variant="inline"
                    format="MM/dd/yyyy"
                    label="Date"
                    value={date}
                    onChange={(date) => {
                      setDate(date);
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
          </Box>

          <Box mb={2}>
            <TextField
              label="Comment"
              fullWidth
              multiline
              value={comment}
              onChange={(event) => {
                setComment(event.target.value);
              }}
              rows={5}
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleSubmit();
            }}
            variant="outlined"
            color="primary"
            autoFocus
          >
            Add
          </Button>
          <Button onClick={handleDiscard} variant="outlined" color="secondary">
            Discard
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
