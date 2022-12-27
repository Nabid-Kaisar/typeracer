import initializeServer from "./initializeServer";
import { port } from "./utils/constants";

const app = initializeServer();

app.listen(port, () => {
  console.log(`listen ${port}`);
});
