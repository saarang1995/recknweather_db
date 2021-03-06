import CreateUser from "./createUser";
import UserAuthentication from "./userAuthentication";
import DeleteUser from "./deleteUser";
import AccuWeather from "./accuWeather";
const express = require('express');
const router = express.Router();

export default class RouteGenerator {

    public init(app) {
        const createUser = new CreateUser();
        createUser.routes(app);

        const userAuthentication = new UserAuthentication();
        userAuthentication.routes(app);

        const deleteUser = new DeleteUser();
        deleteUser.routes(app);

        const accuWeather = new AccuWeather();
        accuWeather.routes(app);
    }

}