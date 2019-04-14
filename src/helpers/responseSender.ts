
import {
    Response
} from 'express';

export default class ResponseSender {

    public static send(res: Response, statusCode: number, status: boolean, message: string, token?: string) {
        if (token) {
            res.status(statusCode).json({ success: status, token: token });
            return;
        }
        res.status(statusCode).json({ success: status, message: message });
    }

}