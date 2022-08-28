import http from "http";
import { toDosHandler } from "./requestHandler.js";

const host = 'localhost';
const port = 5000;

const server = async function (req, res) {
    res.setHeader("Content-Type", "application/json")
    if (req.url?.startsWith("/todos")) {
        const t = "/todos";
        req.url = req.url.slice(t.length);
        await toDosHandler(req,res);
    } else {
        res.end(JSON.stringify("Error from server"))
    }
};

const ser = http.createServer(server);
ser.listen(port, host);








