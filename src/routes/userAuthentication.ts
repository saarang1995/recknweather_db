import {
  Request,
  Response
} from 'express';
import ResponseSender from '../helpers/responseSender';
import TokenGenerator from '../helpers/tokenGenerator';

export default class UserAuthentication {

  public routes(app): void {
    app.route('/authenticate')
      .post((req: Request, res: Response) => {
        const body = req.body;

        console.log(body);
        TokenGenerator.verify(body.token).then(() => {
          ResponseSender.send(res, 200, true, 'Token valid');

        }).catch(() => {
          ResponseSender.send(res, 401, false, 'Token expired');
        });
      });
  }
}