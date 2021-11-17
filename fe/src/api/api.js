import axios from "axios";

export const fetchAllRooms = () => axios.get("/rooms").then((res) => res.data);
export const deleteRoom = (id) => axios.delete(`/room/${id}`);
export const deletePhysicalRoom = (id) => axios.delete(`/physicalRoom/${id}`);
export const deleteOnlineRoom = (id) => axios.delete(`/onlineRoom/${id}`);
export const deleteParticipantFromOnlineRoom = (id, name) =>
  axios.delete(`/onlineRoom/${id}/participant/${name}`);
