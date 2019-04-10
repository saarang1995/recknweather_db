import {
  Request,
  Response
} from 'express';
import UserClass from '../models/userClass';

export default class UserAuthentication {

  public routes(app): void {
    app.route('/user_authentication')
      .post((req: Request, res: Response) => {

        const body = req.body;
        UserClass.isAuthorized({ name: body.userName, password: body.password }).then((result: []) => {
          if(result.length){
            console.log(result);
            res.status(200);
            res.send('user found '+ result);            
          }
          else {
            res.status(500);
            res.send('user not found');
          }
          res.end();
        }).catch((reason) => {
          res.send('Error reason: ' + reason);
          res.end();
        });
      });
  }
}