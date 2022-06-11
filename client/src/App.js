import { io } from "socket.io-client";
import { useState } from "react";
import Header from "./components/Header";
import ChatRoom from "./components/ChatRoom";
const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  socket.on("connect", () => {
    console.log(socket.connected); // true
  });
  const joinRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  socket.on("disconnect", () => {
    console.log(socket.connected); // false
  });

  return (
    <div className="container min-h-screen px-6 py-8 mx-auto transition duration-200 rounded-lg bg-gray-300/20 backdrop-blur-sm hover:border-1-red-500 hover:shadow-yellow-200 xl:w-6/12">
      <div className="font-bold sm:text-3xl md:text-4xl">Chatty</div>
      {!showChat ? (
        <>
          <Header data="Join A Chat Room!"></Header>
          <div className="flex justify-around">
            <input
              type="text"
              placeholder="Name"
              name="username"
              autoComplete="off"
              className="w-4/12 px-2 py-1 rounded shadow-lg focus:outline-none"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Room ID"
              name="room"
              autoComplete="off"
              onChange={(e) => setRoom(e.target.value)}
              className="w-4/12 px-2 py-1 rounded shadow-lg focus:outline-none"
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={joinRoom}
              className="w-3/12 px-4 py-1 my-5 transition duration-300 bg-gray-200 rounded shadow hover:shadow-md hover:bg-gray-700 hover:text-white"
            >
              Submit
            </button>
          </div>
        </>
      ) : (
        <ChatRoom socket={socket} username={username} room={room} />
      )}
      {/* <ChatRoom socket={socket} username={username} room={room} /> */}
    </div>
  );
}
export default App;
