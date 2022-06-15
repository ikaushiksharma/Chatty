// import "alpinejs";
import { io } from "socket.io-client";
import React, { useState } from "react";
import Header from "./components/Header";
import ChatRoom from "./components/ChatRoom";
const socket = io.connect("http://localhost:3001");

// window.theme = () => {
//   return {
//     colorThemes: [
//       "red", //#f7e8a4
//       "dark-blue", // #172A3A
//       "green", // #d9c5b2
//       "black", // #04A777
//     ],
//     themeClass: {},
//     choiceClass(className) {
//       const classes = { "color-choice": true };
//       classes[className] = true;
//       return classes;
//     },
//     changeTheme(className) {
//       this.themeClass = this.colorThemes.reduce((allClasses, cn) => {
//         allClasses[cn] = className === cn;
//         return allClasses;
//       }, {});
//     },
//   };
// };

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
  //   const AlpineTemp = `<div>
  //   <span class="color-theme-container">
  //       <template x-for="(ct, index) in colorThemes" :key="index">
  //           <span x-bind:class="choiceClass(ct)" @click="changeTheme(ct)"></span>
  //       </template>
  //   </span>
  // </div>`;
  // const AlpineWidget = () => (
  //   <div dangerouslySetInnerHTML={{ __html: AlpineTemp }} />
  // );
  return (
    <div className="container min-h-screen px-6 py-8 mx-auto transition duration-200 rounded-lg bg-gray-100/50 backdrop-blur-sm xl:w-6/12">
      {/* <AlpineWidget /> */}
      <div className="font-bold text-center sm:text-3xl md:text-4xl">
        Chatty
      </div>

      {!showChat ? (
        <>
          <div className="p-12 m-12 font-serif text-5xl font-black text-gray-800 ">
            <q>Its Easy Talking to Your Friends with Chatty</q>
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
      {/* <ChatRoom socket={socket} username={username} room={room} /> */}
    </div>
  );
}
export default App;
