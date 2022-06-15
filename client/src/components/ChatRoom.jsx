import React, { useEffect, useState } from "react";
// import ScrollToBottom from "react-scroll-to-bottom";
// import "./a.css";
import InputEmoji from "react-input-emoji";

function ChatRoom({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div
      className="relative w-9/12 mx-auto my-12 bg-white rounded shadow-sm"
      style={{ height: "50rem" }}
    >
      <div className="absolute top-0 left-0 right-0 py-2 text-xl text-center text-white bg-gray-900 rounded h-1/12">
        <p>Get Chatty</p>
      </div>
      <div
        className="relative px-2 overflow-y-scroll text-white min-h-fit top-12 z-1 border-1"
        style={{ height: "45rem" }}
      >
        {messageList.map((messageContent) => {
          if (username === messageContent.author) {
            return (
              <div className="p-0.5 m-0 grid justify-items-end text-right text-black border-black rounded-lg px-7">
                <div className="p-0.5 grid grid-cols-2 col-span-2  text-red-600">
                  <p id="author" className="text-normal">
                    {messageContent.author}
                  </p>
                  <p className="pl-3 text-gray-900 rounded bg-gray-50">
                    {messageContent.time}
                  </p>
                </div>
                <div className="col-span-2 px-1 py-1 my-0 text-xl border border-purple-200 rounded-md bg-purple-50">
                  <p>{messageContent.message}</p>
                </div>
              </div>
            );
          } else {
            return (
              <div className="p-0.5 m-1 relative text-black border-black rounded-lg px-7 w-fit">
                <div className="p-0.5 grid grid-cols-2 col-span-2 text-red-600">
                  <p id="author" className="text-normal">
                    {messageContent.author}
                  </p>
                  <p className="pl-3 text-gray-900 rounded bg-gray-50">
                    {messageContent.time}
                  </p>
                </div>
                <div className="col-span-2 px-1 py-1 my-0 text-xl border border-red-200 rounded-md bg-red-50">
                  <p>{messageContent.message}</p>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className="absolute bottom-0 flex w-full">
        <InputEmoji
          type="text"
          className="w-11/12 px-4 py-2 transition-colors rounded outline-none hover:bg-gray-200 focus:shadow-lg"
          value={currentMessage}
          placeholder="Hey..."
          // onChange={(event) => {
          //   setCurrentMessage(event.target.value);
          // }}
          onChange={setCurrentMessage}
          // onKeyPress={"Enter" && sendMessage()}
          onEnter={sendMessage}
        />
        <button className="w-1/12" onClick={sendMessage}>
          <img
            src="https://img.icons8.com/fluency/48/undefined/filled-sent.png"
            className="w-9/12 p-1 ml-2 transition-colors border-2 border-red-100 rounded-full hover:bg-gray-900"
          />
        </button>
      </div>
    </div>
  );
}

export default ChatRoom;
