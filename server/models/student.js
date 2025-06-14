import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true  
    },
    password: {
        type: String,
        required: true  
    },
    email: {
        type: String,
        required: true,
        unique: true  
    },
    idNumber: {
        type: String,
        required: true,
        unique: true  
    }
});

const Student = mongoose.model('Student', studentSchema);

export default Student;