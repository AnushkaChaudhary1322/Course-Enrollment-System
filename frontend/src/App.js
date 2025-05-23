import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EnrollmentForm from './components/EnrollmentForm';
import EnrollmentList from './components/EnrollmentList';

const App = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [editableEnrollment, setEditableEnrollment] = useState(null);

  const fetchEnrollments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/enrollments');
      setEnrollments(res.data);
    } catch (err) {
      alert('Failed to fetch enrollments');
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const clearEdit = () => {
    setEditableEnrollment(null);
  };

  return (
    <div style={{ maxWidth: 900, margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Course Enrollment System</h1>
      <EnrollmentForm
        fetchEnrollments={fetchEnrollments}
        editableEnrollment={editableEnrollment}
        clearEdit={clearEdit}
      />
      <EnrollmentList
        enrollments={enrollments}
        fetchEnrollments={fetchEnrollments}
        setEditableEnrollment={setEditableEnrollment}
      />
    </div>
  );
};

export default App;
