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
        const success = this.addUserToDB({ name: body.userName, password: body.password});
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

  private addUserToDB(userObject: UserIntf): boolean {
    if (userObject && userObject.name != '' && userObject.password != '') {
      UserClass.addUser(userObject);
      return true;
    } else {
      return false;
    }
  }
}