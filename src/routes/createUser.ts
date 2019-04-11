import {
  Request,
  Response
} from 'express';
import UserClass from '../models/userClass';
import UserIntf from '../interfaces/userIntf';

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
        res.status(500);
        res.send('user already exists');
        res.end();
      }
      else {
        UserClass.addUser(userObject).then((result) => {
          res.send(result);
          res.status(200);
          res.end();
        }).catch((reason) => {
          res.send(reason);
          res.status(500);
          res.end();
        });
      }
      
    }).catch((reason) => {
      res.send('Error reason: ' + reason);
      res.end();
    });
  }
}