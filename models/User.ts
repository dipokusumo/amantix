import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
    phone: string;
    email: string;
    username: string;
    password: string;
    isVerified: boolean;
    verificationToken: string | null;
    comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const userSchema: Schema = new Schema({
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true,
        validate: {
            validator: function (v: string) {
                return /^\d+$/.test(v); // Validasi hanya angka
            },
            message: (props: any) => `${props.value} is not a valid phone number! Only numbers are allowed.`
        }
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
    password: {
        type: String,
        required: [true, 'Password is required'],
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
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;
export { IUser };