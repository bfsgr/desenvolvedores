import { API } from "./api";

const server = new API();

server.listen(3000, () => console.log("API ONLINE"));
