import React, { useEffect, useState } from 'react';
import axios from 'axios';

import StudentList from './StudentList.js';
import SingleStudent from './SingleStudent.js';

export default function Main (props){
  //State is something that is going to make the whole render block
  //to 'rerender' every time we update info in it
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState({});

  const getStudents = async() => {
    console.log('fetching');
    try {
      const { data } = await axios.get('/student');
      setStudents(data);
    } catch (err) {
      console.error(err);
    }
  }

  const selectStudent = (student) => {
    return setSelectedStudent(student);
  }

  useEffect(() => getStudents(), []) // the empty array stops useEffect from infinitely updating.

  return (
    <div>
      <h1>Students</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Tests</th>
          </tr>
        </thead>
        {/* we pass students from our state and selecStudent method to
        the StudentList component, so we can access both of them in StudentList
        component's props */}
        <StudentList
          students={students}
          selectStudent={selectStudent}
        />
      </table>
      {/* we check if selectedStudent exists, aka if we clicked on any
      of the students. if it does, then it's going to be rendered on our page
      since our state has changed.
      we pass our selectedStudent object down to the SingleStudent component.*/}
      {selectedStudent.id ? (
        <SingleStudent student={selectedStudent} />
      ) : null}
    </div>
  );
}

