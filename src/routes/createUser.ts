import {
  Request,
  Response
} from 'express';
import UserClass from '../models/userClass';
import UserIntf from '../interfaces/userIntf';
import ResponseSender from '../helpers/responseSender';

export default class CreateUser {
  public routes(app): void {
    app.route('/create_user')
      .post((req: Request, res: Response) => {
        const body = req.body;
        this.checkExistenceAndAddUser({ name: body.userName, password: body.password }, res);
      });
  }

  private checkExistenceAndAddUser(userObject: UserIntf, res: Response) {
    UserClass.isAuthorized(userObject).then((result: []) => {
      if (result.length) {
        ResponseSender.send(res, 500, false, 'user already exists');
      }
      else {
        UserClass.addUser(userObject).then((result) => {
          ResponseSender.send(res, 200, true, result);
        }).catch((error) => {
          ResponseSender.send(res, 500, false, error);
        });
      }

    }).catch((error) => {
      ResponseSender.send(res, 500, false, error);
    });
  }
}