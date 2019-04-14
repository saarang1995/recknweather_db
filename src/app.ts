import * as express from "express";
import * as bodyParser from "body-parser";
import * as http from "http";

import RouteGenerator from "./routes/routeGenerator";

const app = express();
const httpServer = http.createServer(app);
const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routeGenerator = new RouteGenerator();
routeGenerator.init(app);

httpServer.listen(process.env.PORT || port, () => {
    console.log(`Server running on ${port}`);
});