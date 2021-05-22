import mongoose from 'mongoose';

const csvSchema = mongoose.Schema({

    name: String,
    username: String,
    email: String,
    phone: String,
    website: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const UploadCSV = mongoose.model('UploadedCSV', csvSchema);

export default UploadCSV;