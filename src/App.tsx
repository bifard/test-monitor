import "./App.css";

import { useEffect, useState } from "react";

const socket2 = new WebSocket("ws://localhost:5100/Echo");
//const socket = io("http://localhost:5100/Echo");
function App() {
  const [isConnected, setIsConnected] = useState<boolean>();
  const [fooEvents, setFooEvents] = useState<any[]>([]);
  useEffect(() => {
    socket2.onopen = function () {
      console.log("Соединение установлено");
      setIsConnected(true);
    };

    socket2.onmessage = function (event) {
      console.log(`Получено сообщение: ${event.data}`);
      setFooEvents((prev) => [...prev, event]);
    };

    socket2.onclose = function () {
      console.log("Соединение закрыто");
      setIsConnected(false);
    };

    socket2.onerror = function (error) {
      console.log(`Ошибка: ${error}`);
    };
  }, []);

  useEffect(() => {
    console.log("isConnected : ", isConnected);
    console.log("fooEvents : ", fooEvents);
  }, [isConnected, fooEvents]);

  return (
    <div>
      <span>{`Подключение - ${isConnected}`}</span>
      <ul>
        {fooEvents.map((item, index) => {
          return <li key={index}>{item.data}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
