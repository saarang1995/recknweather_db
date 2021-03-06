import {
  Request,
  Response
} from 'express';
import UserClass from '../models/userClass';
import UserIntf from '../interfaces/userIntf';
import ResponseSender from '../helpers/responseSender';
import TokenGenerator from '../helpers/tokenGenerator';

export default class CreateUser {
  public routes(app): void {
    app.route('/create_user')
      .post((req: Request, res: Response) => {
        const body = req.body;
        this.checkExistenceAndAddUser({ name: body.name, password: body.password, email: body.email }, res);
      });

    app.route('/login')
      .post((req: Request, res: Response) => {
        const body = req.body;
        const userObject = { name: body.name, password: body.password, email: body.email }
        UserClass.isAuthorized(userObject).then((result) => {
          if (result.length) {
            let token = TokenGenerator.sign(userObject);
            ResponseSender.send(res, 200, true, result, token);
          }
          else {
            ResponseSender.send(res, 401, false, null);
          }
        }).catch();
      });
  }

  private checkExistenceAndAddUser(userObject: UserIntf, res: Response) {
    UserClass.isExistingUser(userObject).then((result: []) => {
      if (result.length) {
        ResponseSender.send(res, 500, false, 'Already existing user');
      }
      else {
        UserClass.addUser(userObject).then((result) => {

          /* ------------------------------------------------------------------------------------------
                                  JWT approach for token base authentication:
                            for sending a token instead of just the okay response.
                         
                       ->      let token = TokenGenerator.sign(userObject);
                            ResponseSender.send(res, 200, true, result, token);


                            else  -> ResponseSender.send(res, 200, true, result);

           ------------------------------------------------------------------------------------------
           */

          let token = TokenGenerator.sign(userObject);
          ResponseSender.send(res, 200, true, result, token);
        }).catch((error) => {
          ResponseSender.send(res, 500, false, error);
        });
      }

    }).catch((error) => {
      ResponseSender.send(res, 500, false, error);
    });
  }
}