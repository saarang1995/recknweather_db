import {
  Request,
  Response
} from 'express';

export default class CreateUser {
  public routes(app): void {
    app.route('/create_user')
      .post((req: Request, res: Response) => {
        const body = req.body;
        res.send('Hello');
        res.end();
      })
  }
}