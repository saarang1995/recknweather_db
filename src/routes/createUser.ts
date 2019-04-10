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
        const success = this.addUserToDB(body.userName, body.password);
        if(success) {
          res.send('User saved');
        }
        else {
          res.send('Error while saving the user');
        }
        res.send('hello');
        res.end();
      })
  }

  private addUserToDB(userName: string, password: string): boolean {
    if (userName && password && userName != '' && password != '') {
      UserClass.addUser({
        name: userName,
        password: password
      });
      return true;
    } else {
      return false;
    }
  }
}