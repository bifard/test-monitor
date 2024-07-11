import "./App.css";

import { useEffect, useState } from "react";

import { io } from "socket.io-client";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

const socket2 = new WebSocket("ws://localhost:5100/Echo");
//const socket = io("http://localhost:5100/Echo");
function App() {
  const [isConnected, setIsConnected] = useState<boolean>();
  const [fooEvents, setFooEvents] = useState<any[]>([]);
  useEffect(() => {
    /*    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }
    function onFooEvent(value: any) {
      setFooEvents((previous) => [...previous, value]);
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    }; */
    socket2.onopen = function () {
      console.log("Соединение установлено");
    };

    socket2.onmessage = function (event) {
      console.log(`Получено сообщение: ${event.data}`);
    };

    socket2.onclose = function (event) {
      console.log("Соединение закрыто");
    };

    socket2.onerror = function (error) {
      console.log(`Ошибка: ${error}`);
    };
  }, []);

  useEffect(() => {
    console.log("isConnected : ", isConnected);
    console.log("fooEvents : ", fooEvents);
  }, [isConnected, fooEvents]);

  return <></>;
}

export default App;
