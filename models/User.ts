import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
    role: 'user';
    phone: string | null;
    email: string;
    username: string;
    image: Buffer | null;
    password: string | null;
    isVerified: boolean;
    verificationToken: string | null;
    comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const userSchema: Schema = new Schema({
    role: {
        type: String,
        default: 'user',
        enum: ['user'],
    },
    phone: {
        type: String,
        validate: {
            validator: function (v: string) {
                return v ? /^\d+$/.test(v) : true; // Validasi hanya angka
            },
            message: (props: any) => `${props.value} is not a valid phone number! Only numbers are allowed.`
        },
        default: null
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: function (v: string) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Validasi format email
            },
            message: (props: any) => `${props.value} is not a valid email!`
        }
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    image: {
        type: Buffer,
        default: null,
    },
    password: {
        type: String,
        validate: {
            validator: function (v: string) {
                // If password is provided, it must meet certain criteria (e.g., length).
                // Otherwise, it's optional (e.g., for Google OAuth users).
                return v ? v.length >= 6 : true;
            },
            message: 'Password must be at least 6 characters long',
        },
        default: null,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        default: null,
    }
}, { collection: 'datauser' });

// Menambahkan metode untuk membandingkan password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password || '');
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;
export { IUser };