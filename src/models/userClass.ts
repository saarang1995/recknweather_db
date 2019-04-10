import * as mongoose from 'mongoose';
import UserIntf from '../interfaces/userIntf';

mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true });

const userSchema = mongoose.Schema({
    name: String,
    password: String
});

const User = mongoose.model('user', userSchema);

export default class UserClass {
    public static addUser(userObject: UserIntf) {
        const user = new User(userObject);
        user.save((error, usr) => {
            if (error) {
                console.error('Error while saving user in Database ' + error);
            } else {
                console.log('saved user:  ' + usr);
            }
        });
    }
}