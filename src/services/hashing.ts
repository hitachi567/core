import bcrypt from 'bcrypt';

export default class Hashing {

    static hashing(string: string) {

        return bcrypt.hash(string, 10);

    }

    static comparison(string: string, hashedString: string) {

        return bcrypt.compare(string, hashedString);

    }

}
