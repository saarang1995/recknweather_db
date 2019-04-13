import * as mongoose from 'mongoose';
import UserIntf from '../interfaces/userIntf';

let User;

try {
    mongoose.connect('mongodb://saarang:saarang@123@ds239206.mlab.com:39206/heroku_fnbnpz89', { useNewUrlParser: true });

} catch (error) {

}
if (mongoose) {
    const userSchema = mongoose.Schema({
        name: String,
        password: String
    });

    User = mongoose.model('user', userSchema);

}

export default class UserClass {
    public static addUser(userObject: UserIntf) {
        if (!User) {
            return;
        }
        const user = new User(userObject);
        return new Promise((resolve, reject) => {
            user.save((error, usr) => {
                if (error) {
                    resolve('Error while saving user in Database ' + error);
                } else {
                    reject('saved user:  ' + usr);
                }
            });
        });
    }

    public static isAuthorized(userObject: UserIntf) {
        return new Promise((resolve, reject) => {
            User.find({ name: userObject.name, password: userObject.password }, 'name', (error, user: []) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(user)
                }
            });

        });
    }
}