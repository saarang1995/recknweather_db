import * as express from "express";
import * as bodyParser from "body-parser";
import * as http from "http";

import RouteGenerator from "./routes/routeGenerator";

const app = express();
const httpServer = http.createServer(app);
const port = 3000;
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    next();
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/test',(req,res) => {
    res.status(200).send('welcome to RecknWeather API');
})
const routeGenerator = new RouteGenerator();
routeGenerator.init(app);

httpServer.listen(process.env.PORT || port, () => {
    console.log(`Server running on ${port}`);
});