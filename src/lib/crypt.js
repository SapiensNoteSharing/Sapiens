import bcrypt from 'bcrypt';
import { User } from '$lib/mongodb';


const saltRounds = 10;

async function createHash(psw){
    const hash = await bcrypt.hash(psw, saltRounds);
    return hash;
}

async function compare(user){
    const dbUser = await User.findOne({email: user.email})
    const res = await bcrypt.compare(user.password, dbUser.hash);
    return res;
}

export {
    createHash,
    compare
}

