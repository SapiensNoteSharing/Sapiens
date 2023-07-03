import bcrypt from 'bcrypt';
import { User } from '$lib/mongodb';


const saltRounds = 10;

async function createHash(psw){
    const hash = await bcrypt.hash(psw, saltRounds);
    return hash;
}

async function compare(user){
    const dbUser = await User.findOne({email: user.email})
    bcrypt.compare(user.password, dbUser.hash, (err, result) => {
        return result;
    });
}

export {
    createHash,
    compare
}

