import Enrollment from '../models/Enrollment.js';

export const createEnrollment = async (req, res) => {
    try {
        const { studentName, email, courseName } = req.body;

        if (!studentName || !email || !courseName) {
        return res.status(400).json({ message: 'All fields are required.' });
        }

        const existingEnrollment = await Enrollment.findOne({ email, courseName });

        if (existingEnrollment) {
        return res.status(409).json({ message: 'Student is already enrolled in this course.' });
        }

        const newEnrollment = new Enrollment({
        studentName,
        email,
        courseName,
        });

        await newEnrollment.save();
        res.status(201).json({ message: 'Enrollment successful!' });

    } catch (error) {
        console.error('Enrollment error:', error.message);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
};

export const getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find().sort({ enrollDate: -1 }); 
        res.status(200).json(enrollments);
    } catch (error) {
        console.error('Fetch error:', error.message);
        res.status(500).json({ message: 'Failed to fetch enrollments.' });
    }
};

export const updateEnrollment = async (req, res) => {
    try {
        const { id } = req.params;
        const { studentName, email, courseName } = req.body;

        if (!studentName || !email || !courseName) {
        return res.status(400).json({ message: 'All fields are required.' });
        }

        const existingEnrollment = await Enrollment.findById(id);

        if (!existingEnrollment) {
        return res.status(404).json({ message: 'Enrollment not found' });
        }

        const duplicate = await Enrollment.findOne({
        _id: { $ne: id },
        email,
        courseName,
        });

        if (duplicate) {
        return res.status(409).json({ message: 'This student is already enrolled in that course.' });
        }

        existingEnrollment.studentName = studentName;
        existingEnrollment.email = email;
        existingEnrollment.courseName = courseName;

        await existingEnrollment.save();
        res.status(200).json({ message: 'Enrollment updated successfully' });
    } 
    
    catch (error) {
        console.error('Update error:', error.message);
        res.status(500).json({ message: 'Failed to update enrollment' });
    }
};

export const deleteEnrollment = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Enrollment.findByIdAndDelete(id);

        if (!deleted) {
        return res.status(404).json({ message: 'Enrollment not found' });
        }

        res.status(200).json({ message: 'Enrollment deleted successfully' });
    } catch (error) {
        console.error('Delete error:', error.message);
        res.status(500).json({ message: 'Failed to delete enrollment' });
    }
};

