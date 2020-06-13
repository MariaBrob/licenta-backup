import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

export default function AlertDialog(props) {
  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Edit Project Team</DialogTitle>
        <DialogContent></DialogContent>
      </Dialog>
    </div>
  );
}
