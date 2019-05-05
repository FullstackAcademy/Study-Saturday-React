import React from 'react';

const avgGrade = tests => {
  return Math.round(
    tests.map(test => test.grade).reduce((acc, cur) => acc + cur) / tests.length
  );
};

const SingleStudent = props => {
  return (
    <div>
      <h3>{props.student.fullName} </h3>
      <h3>Average Grade: {avgGrade(props.student.tests)}</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {props.studens.tests.map(test => {
              return (
                <tr key={test.id}>
                  <td>{test.subject}</td>
                  <td>{test.grade}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SingleStudent;
