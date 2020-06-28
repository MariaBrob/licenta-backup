import React from "react";
import {
  Grid,
  Box,
  Avatar,
  TextField,
  Card,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { green, blue, pink } from "@material-ui/core/colors";
import SentimentSatisfiedAltOutlinedIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedOutlinedIcon from "@material-ui/icons/SentimentVerySatisfiedOutlined";
import SentimentDissatisfiedOutlinedIcon from "@material-ui/icons/SentimentDissatisfiedOutlined";

import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  commentCardRoot: {
    marginBottom: "15px",
  },
  textField: {
    color: "#000 !important",
    cursor: "not-allowed !important",
    "&:hover": {
      cursor: "not-allowed !important",
    },
  },
  disabled: {
    cursor: "not-allowed !important",
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

export default function CommentsCard() {
  const classes = useStyles();
  const selectedComments = useSelector(
    (state) => state.volunteers.selectedVolunteerComments
  );
  var avatar = "";

  if (selectedComments !== null && selectedComments.length > 0) {
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
                      root: (classes.textField, classes.disabled),
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
  } else if (selectedComments !== null && selectedComments.length === 0) {
    return (
      <Typography component="h6" variant="h6">
        No comments yet
      </Typography>
    );
  } else {
    return <div></div>;
  }
}
