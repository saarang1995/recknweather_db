import * as mongoose from 'mongoose';
import UserIntf from '../interfaces/userIntf';
import config from '../config/config';
import HashGenerator from '../helpers/hashGenerator';

let User;

try {
  mongoose.connect('mongodb://' + config.mongodb.userName + ':' +
    encodeURIComponent(config.mongodb.password) + '@' +
    config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.dbName, { useNewUrlParser: true });

} catch (error) {
  console.error(`Error while connecting to mongodb -> ${error}`);
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
    return HashGenerator.encrypt(userObject.password).then(hash => {
      if (hash) {
        userObject.password = hash;
        const user = new User(userObject);
        return user.save();
      } else {
        console.error('Error occurred while generating password hash');
        return null;
      }
    }).catch(error => {
      console.error(`Error while generating password hash -> ${error}`);
      return null;
    });
  }

  public static isAuthorized(userObject: UserIntf) {
    return User.find({ name: userObject.name}, 'name, password');
  }
}