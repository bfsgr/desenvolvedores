import { API } from "./api";

const server = new API();

server.listen(5000, () => console.log("API ONLINE"));
