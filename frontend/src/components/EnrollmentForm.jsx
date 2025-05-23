import { useState, useEffect } from 'react';
import axios from 'axios';

const COURSES = ['React', 'Node.js', 'OOPS', 'DSA'];

const EnrollmentForm = ({ fetchEnrollments, editableEnrollment, clearEdit }) => {
    const [studentName, setStudentName] = useState('');
    const [email, setEmail] = useState('');
    const [courseName, setCourseName] = useState(COURSES[0]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (editableEnrollment) {
        setStudentName(editableEnrollment.studentName);
        setEmail(editableEnrollment.email);
        setCourseName(editableEnrollment.courseName);
        }
    }, [editableEnrollment]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!studentName || !email || !courseName) {
        setError('Please fill all fields');
        return;
        }

        try {
        if (editableEnrollment) {
            await axios.put(`http://localhost:5000/api/enrollments/${editableEnrollment._id}`, {
            studentName,
            email,
            courseName,
            });
            clearEdit();
        } else {
            await axios.post('http://localhost:5000/api/enrollments/create', {
            studentName,
            email,
            courseName,
            });
        }
        setStudentName('');
        setEmail('');
        setCourseName(COURSES[0]);
        fetchEnrollments(); 
        } catch (err) {
        if (err.response && err.response.data.message) {
            setError(err.response.data.message);
        } else {
            setError('Something went wrong');
        }
        }
    };

    const handleCancelEdit = () => {
        clearEdit();
        setStudentName('');
        setEmail('');
        setCourseName(COURSES[0]);
        setError('');
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <h2>{editableEnrollment ? 'Update Enrollment' : 'Enroll Student'}</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
            <input
            type="text"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            style={{ marginRight: '10px' }}
            />
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginRight: '10px' }}
            />
            <select value={courseName} onChange={(e) => setCourseName(e.target.value)} style={{ marginRight: '10px' }}>
            {COURSES.map((course) => (
                <option key={course} value={course}>{course}</option>
            ))}
            </select>
            <button type="submit">{editableEnrollment ? 'Update' : 'Enroll'}</button>
            {editableEnrollment && <button type="button" onClick={handleCancelEdit} style={{ marginLeft: '10px' }}>Cancel</button>}
        </div>
        </form>
    );
};

export default EnrollmentForm;
