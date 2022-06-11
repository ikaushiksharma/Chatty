import { io } from "socket.io-client";
import React, { useState } from "react";
import Header from "./components/Header";
import ThemeChanger from "./components/ThemeChanger.jsx";
import ChatRoom from "./components/ChatRoom";
const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [theme, setTheme] = useState("yellow");
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
  const loveTheme = () => {
    setTheme("red");
    document.querySelector("body").style.backgroundColor = "#FBCFE8";
    document.querySelector(
      "body"
    ).style.backgroundImage = `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ef4444' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`;
  };
  const sunTheme = () => {
    setTheme("yellow");
    document.querySelector("body").style.backgroundColor = "#FBCFE8";
    document.querySelector(
      "body"
    ).style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='34' height='44' viewBox='0 0 34 44'%3E%3Cg fill='%23f97316' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M1 6.2C.72 5.55.38 4.94 0 4.36v13.28c.38-.58.72-1.2 1-1.84A12.04 12.04 0 0 0 7.2 22 12.04 12.04 0 0 0 1 28.2c-.28-.65-.62-1.26-1-1.84v13.28c.38-.58.72-1.2 1-1.84A12.04 12.04 0 0 0 7.2 44h21.6a12.05 12.05 0 0 0 5.2-4.36V26.36A12.05 12.05 0 0 0 28.8 22a12.05 12.05 0 0 0 5.2-4.36V4.36A12.05 12.05 0 0 0 28.8 0H7.2A12.04 12.04 0 0 0 1 6.2zM17.36 23H12a10 10 0 1 0 0 20h5.36a11.99 11.99 0 0 1 0-20zm1.28-2H24a10 10 0 1 0 0-20h-5.36a11.99 11.99 0 0 1 0 20zM12 1a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3.46-2a2 2 0 1 0-3.47 2 2 2 0 0 0 3.47-2zm0-4a2 2 0 1 0-3.47-2 2 2 0 0 0 3.47 2zM12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3.46 2a2 2 0 1 0 3.47-2 2 2 0 0 0-3.47 2zm0 4a2 2 0 1 0 3.47 2 2 2 0 0 0-3.47-2zM24 43a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3.46 2a2 2 0 1 0 3.47-2 2 2 0 0 0-3.47 2zm0 4a2 2 0 1 0 3.47 2 2 2 0 0 0-3.47-2zM24 37a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3.46-2a2 2 0 1 0-3.47 2 2 2 0 0 0 3.47-2zm0-4a2 2 0 1 0-3.47-2 2 2 0 0 0 3.47 2z'/%3E%3C/g%3E%3C/svg%3E")`;
  };
  const blueTheme = () => {
    setTheme("blue");
  };
  const blackTheme = () => {
    setTheme("black");
  };

  return (
    <div className="container min-h-screen px-6 py-8 mx-auto transition duration-200 rounded-lg bg-gray-100/50 backdrop-blur-sm hover:border-1-red-500 hover:shadow-yellow-200 xl:w-6/12">
      <ThemeChanger
        loveTheme={loveTheme}
        sunTheme={sunTheme}
        blueTheme={blueTheme}
        blackTheme={blackTheme}
      />
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
