import React, { useEffect } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

interface RaceTrackProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
  playerList?: Array<Player>;
}

interface Player {
  userName: string;
  wpm: number;
}

const RaceTrack: React.FC<RaceTrackProps> = ({ socket, playerList }) => {
  useEffect(() => {
    socket?.emit("requestAllPlayers");

    socket?.on("getAllPlayers", (data) => console.log(data));
  }, []);

  return (
    <>
      {playerList?.map((player: Player, idx: number) => (
        <div>
          <span>{player.userName}</span>
          <span>{player.wpm}</span>{" "}
        </div>
      ))}
    </>
  );
};

export default RaceTrack;
