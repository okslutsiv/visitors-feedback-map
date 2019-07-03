import React, { useState, useEffect } from "react";
import { Button, SvgIcon, makeStyles } from "@material-ui/core";

import "./App.css";
import { getMessages, getPlace } from "./API";

import Map from "./map";
import MessageCard from "./messageCard";
import Feedback from "./feedback";
const useStyles = makeStyles(theme => ({
  root: {
    position: "absolute",
    top: 20,
    right: 40,
    zIndex: 999,
  },
  icon: { marginRight: 8 },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: "-10",
    transform: "translate(-50%, -50%)",
  },
}));

const SendIcon = () => {
  const classes = useStyles();
  return (
    <SvgIcon className={classes.icon} viewBox="0 0 40 40">
      <path d="m3.5 35v-11.6l23.3-3.4-23.3-3.4v-11.6l32.5 15z" />
    </SvgIcon>
  );
};

function App() {
  const initialViewport = {
    lat: 49.84097161743658,
    lng: 24.028902053833008,
    zoom: 4,
  };
  const [viewport, setViewPort] = useState(initialViewport);
  const [haveUsersLocation, setHaveUsersLocation] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [messages, setMessages] = useState({ done: [], error: false });
  const [message, setMessage] = useState({
    userName: "",
    msg: "",
  });
  const [UsersLocationErr, setUsersLocationErr] = useState("");
  const [formSubmit, setFormSubmit] = useState({
    doing: false,
    done: false,
    error: "",
  });
  const [osmPlace, setOsmPlace] = useState("");
  const classes = useStyles();

  useEffect(() => {
    getMessages()
      .then(allMessages => {
        // console.log(allMessages);
        setMessages({ ...messages, done: allMessages });
        setViewPort(initialViewport);
      })
      .catch(err => {
        console.error("Is the server dead? An error occured", err);
        setMessages({ ...messages, error: true });
      });
  }, [formSubmit]);

  return (
    <div>
      <Map
        haveUsersLocation={haveUsersLocation}
        setHaveUsersLocation={setHaveUsersLocation}
        showForm={showForm}
        viewport={viewport}
        setViewPort={setViewPort}
        messages={messages.done}
      />
      {!showForm && !formSubmit.done && !formSubmit.error && !messages.error && (
        <Button
          className={classes.root}
          onClick={() => setShowForm(true)}
          variant="contained"
          color="secondary"
        >
          <SendIcon /> Leave your message
        </Button>
      )}

      {showForm && (
        <MessageCard
          viewport={viewport}
          setViewPort={setViewPort}
          haveUsersLocation={haveUsersLocation}
          setHaveUsersLocation={setHaveUsersLocation}
          UsersLocationErr={UsersLocationErr}
          setUsersLocationErr={setUsersLocationErr}
          setShowForm={setShowForm}
          formSubmit={formSubmit}
          setFormSubmit={setFormSubmit}
          message={message}
          setMessage={setMessage}
          osmPlace={osmPlace}
          setOsmPlace={setOsmPlace}
        />
      )}
      <div>
        <Feedback
          open={!!formSubmit.error}
          variant="error"
          message={formSubmit.error}
          onClose={() =>
            setFormSubmit({ doing: false, done: false, error: "" })
          }
        />
        <Feedback
          open={formSubmit.done}
          variant="success"
          message={`Thank you for the participation`}
          onClose={() =>
            setFormSubmit({ doing: false, done: false, error: "" })
          }
        />
        <Feedback
          open={messages.error}
          variant="error"
          message="Looks like our server is dead, try later pls"
          onClose={() => setMessages({ done: [], error: true })}
        />
      </div>
    </div>
  );
}

export default App;
