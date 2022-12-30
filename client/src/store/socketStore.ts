import create from "zustand";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

interface SocketStoreType {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
  setSocket: (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => void;
  removeSocket: () => void;
  newUserConnectionMessage: string;
  setNewUserConnectionMessage: (message: string) => void;
}

const useSocketStore = create<SocketStoreType>((set) => ({
  socket: null,
  setSocket: (socket: Socket<DefaultEventsMap, DefaultEventsMap>) =>
    set((state) => ({ socket: socket })),
  removeSocket: () =>
    set((state) => ({
      socket: null,
    })),
  newUserConnectionMessage: "",
  setNewUserConnectionMessage: (message: string) =>
    set((state) => ({ newUserConnectionMessage: message })),
}));

export default useSocketStore;
