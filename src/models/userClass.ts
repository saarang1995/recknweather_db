import * as mongoose from 'mongoose';
import UserIntf from '../interfaces/userIntf';

mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true });

const userSchema = mongoose.Schema({
    name: String,
    password: String
});

const User = mongoose.model('user', userSchema);

export default class UserClass {
    public static addUser(userObject: UserIntf): string {

        let response = '';
        const user = new User(userObject);
        user.save((error, usr) => {
            if (error) {
                response = 'Error while saving user in Database ' + error;
            } else {
                response = 'saved user:  ' + usr;
            }
        });
        return response;
    }
}