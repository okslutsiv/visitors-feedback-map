const express = require("express");
const db = require("../db");
const messages = db.get("messages");
const Joi = require("@hapi/joi");

const schema = Joi.object().keys({
  username: Joi.string()
    .min(1)
    .max(100)
    .required(),
  msg: Joi.string()
    .min(1)
    .max(300)
    .required(),
  latitude: Joi.number()
    .min(-90)
    .max(90)
    .required(),
  longitude: Joi.number()
    .min(-180)
    .max(180)
    .required(),
});

const router = express.Router();

router.get("/", (req, res) => {
  messages.find().then(allMessages => res.json(allMessages));
});
router.post("/", (req, res, next) => {
  const value = req.body;
  const result = Joi.validate(value, schema);
  console.log(req.body);

  if (result.error === null) {
    const { username, msg, latitude, longitude } = req.body;
    const newMessage = {
      username,
      msg,
      latitude,
      longitude,
      date: new Date(),
    };

    messages.insert(newMessage).then(insertedMsg => res.json(insertedMsg));
  } else {
    next(result.error);
  }
});

module.exports = router;
