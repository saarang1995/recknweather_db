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

    public static async verify(token: string) {
        // jwt.verify(token, config.jwt.privateKey, { expiresIn: "12h" })
        
        // try {
            
        // } catch (error) {
            
        // }
        return await jwt.verify(token, config.jwt.privateKey, { expiresIn: "12h" });
    }
}