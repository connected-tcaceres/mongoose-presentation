require("dotenv").config();
const seeder = require("mongoose-seed");
const { data } = require("./data");

seeder.connect(process.env.DB_URL, () => {
  // Load Mongoose models
  seeder.loadModels([
    "models/BaseRoom",
    "models/OnlineRoom",
    "models/PhysicalRoom",
  ]);

  // Clear specified collections
  seeder.clearModels(["room", "onlineRoom", "physicalRoom"], () => {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, () => {
      seeder.disconnect();
    });
  });
});
