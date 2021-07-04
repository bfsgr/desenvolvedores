import { Server } from "./api";

const server = new Server();

server.listen(3000, () => console.log("API ONLINE"));
