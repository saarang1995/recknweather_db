import config from "../config/config";
import * as jwt from 'jsonwebtoken';


export default class TokenGenerator {

    public static sign(payload) {
        try {
            return (jwt.sign(payload, config.jwt.privateKey, { expiresIn: "12h" }));
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public static verify(token: string) {
        return jwt.verify(token, config.jwt.publicKey, { expiresIn: "12h" });
    }
}