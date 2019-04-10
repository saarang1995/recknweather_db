import {
  Request,
  Response
} from 'express';

export default class UserAuthentication {
  public routes(app): void {
    app.route('/user_authentication')
      .post((req: Request, res: Response) => {
        const body = req.body;
        res.end();
      })
  }

  private checkIfUserIsRegistered() {

  }
}