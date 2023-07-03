import bcrypt from 'bcrypt';
import { User } from '$lib/mongodb';


const saltRounds = 10;

export async function createHash(user){
    bcrypt.hash(user.password, saltRounds, (err, hash) => {
        User.findByIdAndUpdate(user._id, {$set: {hash: hash}})
    });
}

export async function compare(user){
    const dbUser = await User.findOne({email: user.email})
    bcrypt.compare(user.password, dbUser.hash, (err, result) => {
        return result;
    });
}

export {
    createHash,
    compare
}

