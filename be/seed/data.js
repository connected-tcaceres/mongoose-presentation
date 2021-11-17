const faker = require("faker");

const { ROOM_TYPES } = require("../models/PhysicalRoom");
const { MEETING_ROOM, CUBICLE } = ROOM_TYPES;

const baseRoomFactory = () => ({
  participants: [...Array(faker.datatype.number(3) + 1)].map(() =>
    faker.name.firstName()
  ),
});

const onlineRoomFactory = () => {
  const passcode = faker.datatype.boolean() ? faker.internet.password(8) : null;
  return {
    ...baseRoomFactory(),
    name: `Online Room ${faker.random.alphaNumeric(5)}`,
    url: `http://fakezoom.com/${faker.datatype.uuid()}`,
    ...(passcode && { passcode }),
  };
};

const physicalRoomFactory = () => ({
  ...baseRoomFactory(),
  name: `Physical Room ${faker.random.alphaNumeric(5)}`,
  roomId: faker.random.alphaNumeric(3),
  roomType: faker.datatype.boolean() ? MEETING_ROOM : CUBICLE,
});

exports.data = [
  {
    model: "onlineRoom",
    documents: [...Array(10)].map(onlineRoomFactory),
  },
  {
    model: "physicalRoom",
    documents: [...Array(10)].map(physicalRoomFactory),
  },
];
