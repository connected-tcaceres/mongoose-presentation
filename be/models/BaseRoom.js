const { Schema, model } = require("mongoose");

const options = { discriminatorKey: "__type" };

const schema = new Schema(
  {
    name: { type: String, required: true },
    participants: { type: [String], default: [] },
  },
  options
);

schema.set("toJSON", { virtuals: true });
schema.set("toObject", { virtuals: true });

schema.virtual("numParticipants").get(function () {
  return this.participants.length;
});

const RoomModel = model("room", schema, "rooms");

module.exports = {
  options,
  model: RoomModel,
};
