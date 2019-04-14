import {
  Request,
  Response
} from 'express';
import UserClass from '../models/userClass';
import HashGenerator from '../helpers/hashGenerator';
import ResponseSender from '../helpers/responseSender';

export default class UserAuthentication {

  public routes(app): void {
    app.route('/user_authentication')
      .post((req: Request, res: Response) => {

        const body = req.body;

        UserClass.isAuthorized({ name: body.userName, password: body.password }).then((result) => {
          if (result.length && result[0]) {
            HashGenerator.compare(body.password, result[0].password).then((matched) => {
              if (matched) {
                ResponseSender.send(res, 200, true, `user found ${result}`);
              }
              else {
                ResponseSender.send(res, 500, false, 'user not found');
              }
            }).catch((error) => {
              ResponseSender.send(res, 500, false, `Error: ${error}`);
              console.error(error);
            });
          }
          else {
            ResponseSender.send(res, 500, false, 'user not found');
          }

        }).catch((error) => {
          ResponseSender.send(res, 500, false, `Error: ${error}`);
        });
      });
  }
}