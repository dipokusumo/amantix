import mongoose, { Document, Schema } from 'mongoose';

interface IAdmin extends Document {
    email: string;
    name: string;
    role: 'admin';
}

const adminSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
}, { collection: 'dataadmin' });

const Admin = mongoose.model<IAdmin>('Admin', adminSchema);

export default Admin;
export { IAdmin };