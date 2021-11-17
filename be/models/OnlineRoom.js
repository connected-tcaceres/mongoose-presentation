const { Schema } = require("mongoose");
const { model: RoomModel, options } = require("./BaseRoom");

const schema = new Schema({
  url: { type: String, required: true },
  passcode: { type: String },
});

schema.set("toJSON", { virtuals: true });
schema.set("toObject", { virtuals: true });

schema.virtual("isPasswordProtected").get(function () {
  return !!this.passcode;
});

schema.post(/update/i, function (doc, next) {
  if (doc.participants.length === 0) {
    doc.remove();
  }
  next();
});

const onlineModel = RoomModel.discriminator("onlineRoom", schema, options);

module.exports = {
  model: onlineModel,
};
