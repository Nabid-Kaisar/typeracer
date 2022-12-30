import create from "zustand";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import snackBar from "../components/core/SnackBar";

interface SocketStoreType {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
  setSocket: (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => void;
  removeSocket: () => void;
  newUserConnectionMessage: string;
  setNewUserConnectionMessage: (message: string) => void;
  snackbarOpen: boolean;
  setSnackbarOpen: (isOpen: boolean) => void;
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
  snackbarOpen: false,
  setSnackbarOpen: (isOpen: boolean) =>
    set((state) => ({ snackbarOpen: isOpen })),
}));

export default useSocketStore;
