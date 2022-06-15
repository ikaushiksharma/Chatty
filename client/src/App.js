import { io } from "socket.io-client";
import React, { useState } from "react";
import Header from "./components/Header";
import ChatRoom from "./components/ChatRoom";
const socket = io.connect("http://localhost:3001");
function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  socket.on("connect", () => {
    console.log(socket.connected);
  });
  const joinRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  socket.on("disconnect", () => {
    console.log(socket.connected);
  });
  return (
    <div className="container min-h-screen px-6 py-8 mx-auto transition duration-200 rounded-lg bg-gray-100/50 backdrop-blur-sm xl:w-6/12">
      <div
        style={{
          clipPath:
            " polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)",
        }}
        className="flex items-center justify-center w-7/12 p-12 mx-auto font-bold text-center bg-white rounded-xl h-9/12 sm:text-5xl md:text-5xl"
      >
        Chatty
        <img src="chatty.gif" className="h-20 px-8" />
      </div>

      {!showChat ? (
        <>
          <div className="flex justify-center px-12 py-5 mx-12 mt-12 font-serif text-5xl font-black text-center text-gray-800 ">
            <q>Its Easy Talking to Your Friends with Chatty</q>
            <img src="chat.png" className=" h-96" />
          </div>
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
    </div>
  );
}
export default App;
