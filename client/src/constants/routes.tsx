import Route from "./interfaces/RoutesType";
import Register from "../components/Register";
import Race from "../components/Race";

export const ROUTES: Array<Route> = [
  {
    pathName: "register",
    route: "/",
    component: <Register />,
  },
  {
    pathName: "race",
    route: "/race",
    component: <Race />,
  },
];
