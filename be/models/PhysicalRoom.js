const { Schema } = require("mongoose");
const { model: RoomModel, options } = require("./BaseRoom");

const ROOM_TYPES = {
  MEETING_ROOM: "meeting room",
  CUBICLE: "cubicle",
};

const schema = new Schema({
  roomId: { type: String, required: true },
  roomType: { enum: Object.values(ROOM_TYPES), type: String, required: true },
});

schema.set("toJSON", { virtuals: true });
schema.set("toObject", { virtuals: true });

schema.virtual("isPersonalRoom").get(function () {
  return this.roomType === ROOM_TYPES.CUBICLE;
});

const physicalModel = RoomModel.discriminator("physicalRoom", schema, options);

module.exports = {
  ROOM_TYPES,
  model: physicalModel,
};
