import React from 'react';

export default (props) => {
  console.log('PROPS IN STUDENTLIST', props);
  return (
    <div>
      {props.students.map((student) => {
        return (
          <tr key={student.id}>
            <td>{student.fullName}</td>
            <td onClick={() => props.student(student)}>Details</td>
          </tr>
        );
      })}
    </div>
  );
};
