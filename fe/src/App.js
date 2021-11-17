import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import {
  fetchAllRooms,
  deleteOnlineRoom,
  deletePhysicalRoom,
  deleteRoom,
  deleteParticipantFromOnlineRoom,
} from "./api/api";

axios.defaults.baseURL = "http://localhost:5000";

function App() {
  const [roomData, setRoomData] = useState({});
  const { rooms = [], physicalRooms = [], onlineRooms = [] } = roomData;

  const initialize = async () => {
    const data = await fetchAllRooms();
    setRoomData(data);
  };

  useEffect(() => {
    initialize();
  }, []);

  const delPhysicalRoom = async (id) => {
    await deletePhysicalRoom(id);
    await initialize();
  };

  const delOnlineRoom = async (id) => {
    await deleteOnlineRoom(id);
    await initialize();
  };

  const delRoom = async (id) => {
    await deleteRoom(id);
    await initialize();
  };

  const delParticipant = async (id, name) => {
    await deleteParticipantFromOnlineRoom(id, name);
    await initialize();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>All Rooms</h2>
        <table>
          <tr>
            <th>DB id</th>
            <th>name</th>
            <th>participants</th>
            <th>type</th>
            <th>num participants</th>
          </tr>
          {rooms.map((room) => (
            <tr>
              <td>
                <button onClick={() => delRoom(room.id)}>X</button>
                {room.id}
              </td>
              <td>{room.name}</td>
              <td>{JSON.stringify(room.participants)}</td>
              <td>{room.__type}</td>
              <td>{room.numParticipants}</td>
            </tr>
          ))}
        </table>
        <h2>Physical Rooms</h2>
        <table>
          <tr>
            <th>DB id</th>
            <th>room id</th>
            <th>room type</th>
            <th>is personal room?</th>
          </tr>
          {physicalRooms.map((room) => (
            <tr>
              <td>
                <button onClick={() => delPhysicalRoom(room.id)}>x</button>
                {room.id}
              </td>
              <td>{room.roomId}</td>
              <td>{room.roomType}</td>
              <td>{JSON.stringify(room.isPersonalRoom)}</td>
            </tr>
          ))}
        </table>
        <h2>Online Rooms</h2>
        <table>
          <tr>
            <th>DB id</th>
            <th>room url</th>
            <th>passcode</th>
            <th>is password protected?</th>
          </tr>
          {onlineRooms.map((room) => (
            <tr>
              <td>
                <button onClick={() => delOnlineRoom(room.id)}>X</button>
                <button
                  onClick={() => delParticipant(room.id, room.participants[0])}
                >
                  remove participant
                </button>
                {room.id}
              </td>
              <td>{room.url}</td>
              <td>{room.passcode}</td>
              <td>{JSON.stringify(room.isPasswordProtected)}</td>
            </tr>
          ))}
        </table>
      </header>
    </div>
  );
}

export default App;
