import axios from 'axios';

const EnrollmentList = ({ enrollments, fetchEnrollments, setEditableEnrollment }) => {

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this enrollment?')) {
        try {
            await axios.delete(`http://localhost:5000/api/enrollments/${id}`);
            fetchEnrollments();
        } catch (err) {
            alert('Failed to delete enrollment');
        }
        }
    };

    return (
        <div>
        <h2>Enrolled Students</h2>
        {enrollments.length === 0 ? (
            <p>No enrollments yet.</p>
        ) : (
            <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
                <tr>
                <th>Student Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Enroll Date</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {enrollments.map(({ _id, studentName, email, courseName, enrollDate }) => (
                <tr key={_id}>
                    <td>{studentName}</td>
                    <td>{email}</td>
                    <td>{courseName}</td>
                    <td>{new Date(enrollDate).toLocaleDateString()}</td>
                    <td>
                    <button onClick={() => setEditableEnrollment({ _id, studentName, email, courseName })}>Edit</button>
                    <button onClick={() => handleDelete(_id)} style={{ marginLeft: '10px' }}>Delete</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </div>
    );
};

export default EnrollmentList;
