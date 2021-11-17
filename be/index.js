require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { model: BaseRoomModel } = require("./models/BaseRoom");
const { model: PhysicalRoomModel } = require("./models/PhysicalRoom");
const { model: OnlineRoomModel } = require("./models/OnlineRoom");

const app = express();

app.use(cors());

app.get("/rooms", async (_req, res) => {
  const rooms = await BaseRoomModel.find();
  const physicalRooms = await PhysicalRoomModel.find();
  const onlineRooms = await OnlineRoomModel.find();
  res.send({ rooms, physicalRooms, onlineRooms });
});

app.delete("/room/:id", async (req, res) => {
  const { id } = req.params;
  await BaseRoomModel.findByIdAndDelete(id);
  return res.status(200).send();
});

app.delete("/physicalRoom/:id", async (req, res) => {
  const { id } = req.params;
  await PhysicalRoomModel.findByIdAndDelete(id);
  return res.status(200).send();
});

app.delete("/onlineRoom/:id", async (req, res) => {
  const { id } = req.params;
  await OnlineRoomModel.findByIdAndDelete(id);
  return res.status(200).send();
});

app.delete("/onlineRoom/:id/participant/:name", async (req, res) => {
  const { id, name } = req.params;
  await OnlineRoomModel.findByIdAndUpdate(
    id,
    {
      $pull: { participants: name },
    },
    { new: true }
  );
  return res.status(200).send();
});

app.listen(5000);

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connected to the database"));
