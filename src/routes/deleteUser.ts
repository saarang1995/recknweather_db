import {
    Request,
    Response
  } from 'express';
  
  export default class DeleteUser {
    public routes(app): void {
      app.route('/delete_user')
        .post((req: Request, res: Response) => {
          const body = req.body;
          res.send('Hello');
          res.end();
        })
    }
  }