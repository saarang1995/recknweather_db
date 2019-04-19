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
    password: String,
    email: String
  });

  User = mongoose.model('user', userSchema);

}

export default class UserClass {
  public static addUser(userObject: UserIntf) {
    if (!User) {
      return;
    }
    const user = new User(userObject);
    return user.save();

    // return UserClass.encrypt(userObject.password).then((hashedPassword: string) => {
    //   userObject.password = hashedPassword;
    //   const user = new User(userObject);
    //   return user.save();
    // }).catch();
  }

  public static isExistingUser(userObject: UserIntf) {
    return User.find({ email: userObject.email }, 'name, password, email');
  }

  public static isAuthorized(userObject: UserIntf) {
    return User.find({ email: userObject.email, password: userObject.password }, 'name, password, email');

    // return UserClass.encrypt(userObject.password).then((hashedPassword: string) => {
    //   return User.find({ email: userObject.email, password: hashedPassword }, 'name, password, email');
    // }).catch(() => { return null; });
  }

  private static encrypt(value: string) {
    return new Promise((resolve, reject) => {
      HashGenerator.encrypt(value).then(hash => {
        if (hash) {
          console.log(`input- ${value}`);
          console.log(`output- ${hash}`);
          resolve(hash);
        } else {
          reject('Error occurred while generating password hash');
        }
      }).catch(error => {
        reject(`Error occurred while generating password hash -> ${error}`);
      });
    });

  }
}