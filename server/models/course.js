import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  targetAudience: String,
  imageUrl: String,
imageGallery: [String],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },

  totalMeetings: { type: Number, required: true }, // כמה שיעורים
  meetingDays: [String], // למשל: ['ראשון', 'שלישי']
  meetingTime: {
    start: String, // למשל '17:00'
    end: String    // למשל '18:30'
  },
  location: {
    type: String, // למשל: 'מרכז אמנויות, רח׳ הפרחים 5' או 'Zoom'
    required: true
  }
});



const Course = mongoose.model('Course', courseSchema);

export default Course;
