import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true  
    },
    startDate: {
        type: Date,
        required: true  
    },
    endDate: {
        type: Date,
        required: true  
    },
    targetAudience: {
        type: String  
    },
    price: {
        type: Number,
        required: true  
    },
    description: {
        type: String  
    }
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
