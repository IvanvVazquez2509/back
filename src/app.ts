// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
import Server from "./classes/server";
const server = new Server();
server.listen();
