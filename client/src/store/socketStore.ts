import create from "zustand";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

interface SocketStoreType {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  setSocket: (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => void;
  removeSocket: () => void;
}

const socketStore = create<SocketStoreType>((set) => ({
  socket: null as unknown as Socket<DefaultEventsMap, DefaultEventsMap>,
  setSocket: (socket: Socket<DefaultEventsMap, DefaultEventsMap>) =>
    set((state) => ({ socket: socket })),
  removeSocket: () =>
    set((state) => ({
      socket: null as unknown as Socket<DefaultEventsMap, DefaultEventsMap>,
    })),
}));
