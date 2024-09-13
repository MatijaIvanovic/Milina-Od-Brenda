import mongoose, {Schema, Document, Model } from 'mongoose';

interface AdminDoc extends Document{
    email: string;
    password: string;
}

const AdminSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});

const Admin = mongoose.model<AdminDoc>('admin', AdminSchema);

export {Admin}