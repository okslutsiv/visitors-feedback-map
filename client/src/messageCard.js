import React, { useEffect } from "react";
import Form from "./form";
import { getUserLocation, getPlace } from "./API";

import {
  Typography,
  makeStyles,
  Card,
  CardContent,
  CircularProgress,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1000,
    padding: "16px 8px",
  },
  input: { width: "100%", marginBottom: 16 },
  loader: {
    textAlign: "center",
    margin: 24,
    color: theme.palette.primary.light,
  },
}));

const MessageCard = ({
  haveUsersLocation,
  setHaveUsersLocation,
  UsersLocationErr,
  setUsersLocationErr,
  setShowForm,
  viewport,
  setViewPort,
  formSubmit,
  setFormSubmit,
  message,
  setMessage,
  osmPlace,
  setOsmPlace,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getUserLocation()
      .then(pos => {
        setViewPort({
          lat: pos.lat,
          lng: pos.lng,
          zoom: 16,
        });
        setHaveUsersLocation(true);
      })
      .catch(e => {
        setUsersLocationErr("Sorry, cannot get your location ");
        console.error("Cannot get location", e);
      });
  }, []);

  viewport &&
    getPlace(viewport.lat, viewport.lng, "pl").then(place => {
      console.log(place.display_name);
      setOsmPlace(`${place.display_name}`);
    });

  const handleSubmit = e => {
    e.preventDefault();
    setFormSubmit({
      ...formSubmit,
      doing: true,
    });
    const submitMessage = {
      username: message.userName.trim(),
      msg: message.msg.trim(),
      latitude: viewport.lat,
      longitude: viewport.lng,
    };
    fetch(`${process.env.REACT_APP_API_URL}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(submitMessage),
    })
      .then(res => {
        res.json();
        console.log(res.status);
        if (res.status < 200 || res.status >= 300)
          throw Error("Database error");
      })
      .then(insertedMsg => {
        console.log(insertedMsg);
        setFormSubmit({
          doing: false,
          done: true,
          error: "",
        });
        setShowForm(false);
        setMessage({
          userName: "",
          msg: "",
        });
      })
      .catch(e => {
        console.error("Error occurred: ", e);
        setFormSubmit({
          doing: false,
          done: false,
          error: "Sorry, cannot submit your data",
        });
        setShowForm(false);
        setMessage({
          userName: "",
          msg: "",
        });
      });
  };
  const handleCancel = () => {
    setShowForm(false);
    setMessage({
      userName: "",
      msg: "",
    });
  };

  const handleChange = name => e => {
    setMessage({ ...message, [name]: e.target.value });
  };

  return (
    <>
      <Card className={classes.root}>
        {!haveUsersLocation && !UsersLocationErr && (
          <CardContent>
            <Typography variant="body2" color="primary" align="center">
              Fetching your location....
            </Typography>
            <div className={classes.loader}>
              <CircularProgress size={48} />
            </div>
          </CardContent>
        )}
        {!haveUsersLocation && UsersLocationErr && (
          <CardContent>
            <Typography>{UsersLocationErr}</Typography>
            <Button onClick={() => setShowForm(false)}>Close</Button>
          </CardContent>
        )}
        {haveUsersLocation &&
          !Object.values(formSubmit).some(value => value === true) && (
            <Form
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleCancel={handleCancel}
              message={message}
              osmPlace={osmPlace}
            />
          )}
        {formSubmit.doing && (
          <CardContent>
            <Typography variant="body2" color="primary" align="center">
              Sending data....
            </Typography>
            <div className={classes.loader}>
              <CircularProgress size={48} />
            </div>
          </CardContent>
        )}
      </Card>
      {formSubmit.done && (
        <CardContent>
          <Typography variant="body2" color="primary" align="center">
            Thank you for your feedback
          </Typography>
        </CardContent>
      )}
    </>
  );
};

export default MessageCard;
