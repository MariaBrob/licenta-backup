import React from "react";
import {
  withStyles,
  makeStyles,
  Button,
  Dialog,
  IconButton,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";

import AddCommentDialog from "./dialogs/AddCommentDialog";
import VolunteerDetails from "./dialogs/VolunteerDetails";
import VolunteerProjectsTable from "./dialogs/VolunteerProjectsTable";
import CommentsCard from "./dialogs/CommentsCard";
import { useSelector, useDispatch } from "react-redux";
import { getComments } from "../../actions/membersActions";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxHeight: 500,
    minHeight: 500,
    overflowY: "auto",
  },
  cardTitle: {
    marginBottom: "20px",
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function CustomizedDialogs(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedVolunteer = useSelector(
    (state) => state.volunteers.selectedVolunteer
  );
  const selectedVolunteerProjects = useSelector(
    (state) => state.volunteers.selectedVolunteerProjects
  );
  const [openCommentDialog, setOpenCommentDialog] = React.useState(false);

  const handleOpenCommentDialog = () => {
    setOpenCommentDialog(true);
  };

  const handleCloseCommentDialog = () => {
    dispatch(getComments(selectedVolunteer._id));
    setOpenCommentDialog(false);
  };

  const renderProjectsTable = () => {
    if (selectedVolunteerProjects !== null) {
      return <VolunteerProjectsTable />;
    } else {
      return null;
    }
  };

  return (
    <Dialog
      onClose={props.handleClose}
      maxWidth={"xl"}
      fullWidth={true}
      open={props.open}
    >
      <DialogTitle onClose={props.handleClose}>
        <b>{selectedVolunteer.name}</b>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Card className={classes.root} variant="outlined">
                  <Grid container spacing={2}>
                    <Grid item md={12}>
                      <CardContent>
                        <Grid
                          container
                          spacing={2}
                          className={classes.cardTitle}
                        >
                          <Grid item md={12}>
                            <Typography variant="h5" component="h2">
                              <b>General informations</b>
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                          <Grid item md={12}>
                            <VolunteerDetails />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={4}>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Card className={classes.root} variant="outlined">
                  <Grid container spacing={2}>
                    <Grid item md={12}>
                      <CardContent>
                        <Grid
                          container
                          spacing={2}
                          className={classes.cardTitle}
                        >
                          <Grid item md={8}>
                            <Typography variant="h5" component="h2">
                              <b>Comments</b>
                            </Typography>
                          </Grid>
                          <Grid container item md={4} justify="flex-end">
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => handleOpenCommentDialog()}
                            >
                              Add comment
                            </Button>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                          <Grid item md={12}>
                            <CommentsCard />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={4}>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Card className={classes.root} variant="outlined">
                  <Grid container spacing={2}>
                    <Grid item md={12}>
                      <CardContent>
                        <Grid
                          container
                          spacing={2}
                          className={classes.cardTitle}
                        >
                          <Grid item md={12}>
                            <Typography variant="h5" component="h2">
                              <b>Projects</b>
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                          <Grid item md={12}>
                            {renderProjectsTable()}
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>

      <AddCommentDialog
        open={openCommentDialog}
        handleClose={handleCloseCommentDialog}
      />
    </Dialog>
  );
}
