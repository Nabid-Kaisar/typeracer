import io, { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { PORT } from "../constants/constants";
import { DefaultEventsMap } from "@socket.io/component-emitter";

export default function useConnectSocket() {
  const [socket, setSocket] = useState(
    null as unknown as Socket<DefaultEventsMap, DefaultEventsMap>
  );

  useEffect(() => {
    if (socket && socket.connected) return;
    setSocket(io(`http://localhost:${PORT}`, { transports: ["websocket"] }));
    socket?.on("greetings", (args) => {
      debugger;
      console.log(args);
    });

    return () => {
      console.log("unmounting");
      socket?.disconnect();
      setSocket(null as unknown as Socket<DefaultEventsMap, DefaultEventsMap>);
    };
  }, []);

  // socket.on("connection",()=> console.log('connet'))
  // socket.on("message",()=> console.log('connet'))
  // socket.emit("message", "random");

  return socket;
}
