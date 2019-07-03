import React from "react";

import {
  Button,
  Typography,
  makeStyles,
  TextField,
  CardContent,
  CardActions,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  input: { width: "100%", marginBottom: 16 },
}));
const Form = ({
  handleSubmit,
  handleChange,
  handleCancel,
  message,
  osmPlace,
}) => {
  const classes = useStyles();
  const validNameInput = message.userName.length <= 100;
  const validMsgInput = message.msg.length <= 300;
  return (
    <CardContent>
      <Typography
        variant="body1"
        color="textPrimary"
        align="center"
        style={{ fontSize: 12 }}
        gutterBottom
      >
        Leave us a message with your current location
      </Typography>
      <Typography
        variant="body1"
        color="primary"
        align="center"
        style={{ fontSize: 14 }}
        gutterBottom
      >
        <strong>{osmPlace}</strong>
      </Typography>
      <Typography
        variant="body1"
        color="textPrimary"
        align="center"
        style={{ fontSize: 12 }}
        gutterBottom
      >
        Or edit it by dragging the marker
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          onChange={handleChange("userName")}
          type="text"
          name="userName"
          variant="filled"
          label="Name"
          value={message.userName}
          helperText={!validNameInput && "too long name"}
          className={classes.input}
          required
          error={!validNameInput}
        />
        <TextField
          onChange={handleChange("msg")}
          type="textarea"
          name="msg"
          variant="filled"
          label="Message"
          value={message.msg}
          multiline
          rows={4}
          helperText={!validMsgInput && "too long message"}
          className={classes.input}
          required
          error={!validMsgInput}
        />
        <CardActions>
          <Button color="primary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginLeft: "auto" }}
            disabled={!validNameInput || !validMsgInput}
          >
            Send
          </Button>
        </CardActions>
      </form>
    </CardContent>
  );
};

export default Form;
