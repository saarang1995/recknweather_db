import * as bcrypt from 'bcrypt';
const salt: number = 10;


export default class HashGenerator {
    public static encrypt(valueToEncrypt: string) {
        return bcrypt.hash(valueToEncrypt, salt);
    }
    public static compare(uncryptedValue: string, hash: string) {
        return bcrypt.compare(uncryptedValue, hash);
    }
}