import React from 'react';

const avgGrade = tests => {
    return (
        Math.round(
    tests.map(test => test.grade)
    .reduce((x, y) => x + y) / tests.length
    ))
}

const SingleStudent = (props) => {
    console.log('ppp', props)
   return ( <div>
        <h3>{props.student.fullName}</h3>
        <h3>Average grade: {avgGrade(props.student.tests)}%</h3>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                {
                    props.student.tests.map((test) => {
                        return (
                            <tr key={test.id}>
                                <td>{test.subject}</td>
                                <td>{test.grade}%</td>
                            </tr>
                        )
                    }
                    )
                }
                </tbody>
            </table>
        </div>
    </div>)
}


export default SingleStudent