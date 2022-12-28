import io, {Socket} from "socket.io-client";
import {useEffect, useState} from "react";
import {PORT} from "../constants/constants";
import {DefaultEventsMap} from "@socket.io/component-emitter";

export default function useConnectSocket() {
    let socket = null as unknown as  Socket<DefaultEventsMap, DefaultEventsMap>;

    useEffect(() => {
        socket = io(`http://localhost:${PORT}`,{ transports: ['websocket'] })
        socket.on("connection",()=> console.log('connet'))
        socket.on("message",()=> console.log('connet'))
        socket.emit("message", "random");

        // return () => {
        //     socket.close()
        // };
    }, [])

    return socket;
}