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
  Box,
  Avatar,
  TextField,
} from "@material-ui/core";
import { green, blue, pink } from "@material-ui/core/colors";
import SentimentSatisfiedAltOutlinedIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedOutlinedIcon from "@material-ui/icons/SentimentVerySatisfiedOutlined";
import SentimentDissatisfiedOutlinedIcon from "@material-ui/icons/SentimentDissatisfiedOutlined";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
// import RemoveRedEye from "@material-ui/icons/RemoveRedEye";

import AddCommentDialog from "./dialogs/AddCommentDialog";
import VolunteerProjectsTable from "./VolunteerProjectsTable";
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
  commentCardRoot: {
    marginBottom: "15px",
  },
  littleEye: {
    fontSize: "1.2rem",
    paddingLeft: "2px",
  },
  littleEyeButton: {
    paddingLeft: "4px",
    paddingRight: "0px",
  },
  textField: {
    color: "#000 !important",
  },
  positiveComment: {
    color: "#fff",
    backgroundColor: green[500],
  },
  neutralComment: {
    color: "#fff",
    backgroundColor: blue[500],
  },
  negativeComment: {
    color: "#fff",
    backgroundColor: pink[500],
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

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedVolunteer = useSelector(
    (state) => state.volunteers.selectedVolunteer
  );
  const selectedComments = useSelector(
    (state) => state.volunteers.selectedVolunteerComments
  );
  const selectedVolunteerProjects = useSelector(
    (state) => state.volunteers.selectedVolunteerProjects
  );
  const [openCommentDialog, setOpenCommentDialog] = React.useState(false);
  var avatar = "";

  // React.useEffect(() => {
  //   renderCommentsCard();
  // }, [selectedComments]);

  const handleOpenTeamDialog = () => {
    setOpenCommentDialog(true);
  };

  const handleCloseTeamDialog = () => {
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

  const renderCommentsCard = () => {
    if (selectedComments !== null) {
      return selectedComments.map((element, index) => {
        if (element.result === "negative") {
          avatar = (
            <Avatar className={classes.negativeComment} variant="rounded">
              <SentimentDissatisfiedOutlinedIcon />
            </Avatar>
          );
        } else if (element.result === "positive") {
          avatar = (
            <Avatar className={classes.positiveComment} variant="rounded">
              <SentimentVerySatisfiedOutlinedIcon />
            </Avatar>
          );
        } else {
          avatar = (
            <Avatar className={classes.neutralComment} variant="rounded">
              <SentimentSatisfiedAltOutlinedIcon />
            </Avatar>
          );
        }
        return (
          <Card
            className={classes.commentCardRoot}
            key={index}
            variant="outlined"
          >
            <CardContent>
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <TextField
                    label="Author"
                    value={element.comment_by}
                    className={classes.customTextField}
                    InputLabelProps={{
                      classes: {
                        root: classes.textField,
                      },
                    }}
                    InputProps={{
                      classes: {
                        root: classes.textField,
                      },
                    }}
                    disabled
                  />
                </Grid>
                <Grid item md={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      disabled
                      variant="inline"
                      format="MM/dd/yyyy"
                      label="Date"
                      InputLabelProps={{
                        classes: {
                          root: classes.textField,
                        },
                      }}
                      InputProps={{
                        classes: {
                          root: classes.textField,
                        },
                      }}
                      value={new Date(element.date)}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item md={10}>
                  <Box mt={2}>
                    <TextField
                      label="Comment"
                      fullWidth
                      multiline
                      disabled
                      value={element.comment}
                      rowsMax={15}
                      InputLabelProps={{
                        classes: {
                          root: classes.textField,
                        },
                      }}
                      InputProps={{
                        classes: {
                          root: classes.textField,
                        },
                      }}
                      variant="outlined"
                    />
                  </Box>
                </Grid>
                <Grid item md={2}>
                  <Box mt={2}>{avatar}</Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
      });
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
                        <Grid container spacing={2}>
                          <Grid item md={12}>
                            <Typography variant="h5" component="h2">
                              <b>General informations</b>
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                          <Grid item md={12}>
                            <Typography variant="subtitle1" component="h2">
                              Full name: <b>{selectedVolunteer.name}</b>
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                          <Grid item md={12}>
                            <Typography variant="subtitle1" component="h2">
                              Personal email: {selectedVolunteer.email}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                          <Grid item md={12}>
                            <Typography variant="subtitle1" component="h2">
                              Organisation email: {selectedVolunteer.work_email}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                          <Grid item md={12}>
                            <Typography variant="subtitle1" component="h2">
                              Phone: {selectedVolunteer.phone}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                          <Grid item md={12}>
                            <Typography variant="subtitle1" component="h2">
                              University: {selectedVolunteer.university}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                          <Grid item md={12}>
                            <Typography variant="subtitle1" component="h2">
                              Started in: {selectedVolunteer.start_year}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                          <Grid item md={12}>
                            <Typography variant="subtitle1" component="h2">
                              Department: {selectedVolunteer.department}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                          <Grid item md={12}>
                            <Typography variant="subtitle1" component="h2">
                              Started in: {selectedVolunteer.start_year}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                          <Grid item md={12}>
                            <Typography variant="subtitle1" component="h2">
                              Finished in: {selectedVolunteer.end_year}
                            </Typography>
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
                        <Grid container spacing={2}>
                          <Grid item md={12}>
                            <Typography variant="h5" component="h2">
                              <b>Comments</b>
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                          <Grid item md={12}>
                            {renderCommentsCard()}
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
                        <Grid container spacing={2}>
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
      <DialogActions>
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleOpenTeamDialog()}
        >
          Add comment
        </Button>
        <Button variant="outlined" size="small">
          Edit team
        </Button>
        <Button variant="outlined" size="small">
          Add task
        </Button>
      </DialogActions>

      <AddCommentDialog
        open={openCommentDialog}
        handleClose={handleCloseTeamDialog}
      />
    </Dialog>
  );
}
