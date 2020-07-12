import { Schema, model, Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const schema = new Schema({
    active: {
        default: true,
        type: Boolean
    },
    avatar: {
        default: '',
        trim: true,
        type: String
    },
    username: {
        maxlength: 15,
        minlength: 5,
        required: true,
        trim: true,
        type: String,
        unique: true
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        enum: {
            values: ['ROLE_ADMIN', 'ROLE_RESEARCHER'],
            message: '{VALUE} no es un role valido'
        },
        default: 'ROLE_RESEARCHER',
        type: String
    }
}, { timestamps: true });

interface UserReq {
    username?: string;
    email: string;
    password: string;
}

interface IUser extends UserReq, Document {
    avatar?: string;
    active?: boolean;
    role?: string;
    createdAt: string;
    updatedAt: string;
}

schema.plugin(uniqueValidator, { message: '{VALUE}' });

const UserModel = model<IUser>('User', schema);


export { UserModel, IUser, UserReq }