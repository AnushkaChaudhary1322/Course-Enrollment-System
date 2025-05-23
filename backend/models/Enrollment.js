import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    courseName: {
        type: String,
        required: true,
        enum: {
        values: ['React', 'Node.js', 'OOPS', 'DSA']
        },
    },
    enrollDate: {
        type: Date,
        default: Date.now,
    },
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

export default Enrollment;
