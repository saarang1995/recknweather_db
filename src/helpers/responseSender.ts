
import {
    Response
} from 'express';

export default class ResponseSender {

    public static send(res: Response, statusCode: number, status: boolean, message: string) {
        res.status(statusCode).json({ success: status, message: message });
    }

}