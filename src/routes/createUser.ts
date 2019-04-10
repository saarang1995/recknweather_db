import {
  Request,
  Response
} from 'express';
import UserClass from '../models/userClass';

export default class CreateUser {
  public routes(app): void {
    app.route('/create_user')
      .post((req: Request, res: Response) => {
        const body = req.body;

        UserClass.addUser({ name: body.userName, password: body.password }).then((result) => {
          res.send(result);
          res.status(200);
          res.end();
        }).catch((reason) => {
          res.send(reason);
          res.status(500);
          res.end();
        });
      })
  }
}