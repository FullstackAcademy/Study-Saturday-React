import React from 'react';

export default (props) => {
  console.log('PROPS IN SINGLE STUDENT', props);
  const avgGrade = (tests) => {
    return Math.round(
      tests.map((test) => test.grade).reduce((x, y) => x + y) / tests.length
    );
  };
  return (
    <div>
      <h1>{props.student.fullName}</h1>
      <h1>Average Grade: {avgGrade(props.student.tests)}%</h1>
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Grade</th>
          </tr>
          <tbody>
            {
              props.student.tests.map((testObj) => {
                return (
                  <tr>
                    <td>
                      {testObj.subject}
                    </td>
                    <td>{testObj.grade}%</td>
                  </tr>
                )
              })
            }
          </tbody>
        </thead>
      </table>
    </div>
  );
};
