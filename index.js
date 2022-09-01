import http from "http";
import { toDosHandler } from "./requestHandler.js";

const host = 'localhost';
const port = 4000;

const server = async function (req, res) {
    res.setHeader("Content-Type", "application/json")
    const t = "/API/v1/todos"
    if (req.url?.startsWith(t)) {
        req.url = req.url.slice(t.length);
        await toDosHandler(req,res);
    } else {
        res.end(JSON.stringify("Error from server"))
    }
};

const ser = http.createServer(server);
ser.listen(port, host);








