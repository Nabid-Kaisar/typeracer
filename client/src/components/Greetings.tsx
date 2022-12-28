import Typography from "@mui/material/Typography";
import React from "react";

interface GreetingsProps{
    user: string;
}

const Greetings: React.FC<GreetingsProps> = ({user}) => {
    return <Typography >{user}</Typography>
}

export default Greetings;