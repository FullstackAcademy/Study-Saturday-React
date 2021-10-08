import React from 'react';

//we received students and selectStudent from our parent component - Main
const StudentList = (props) => {
    return (
        <tbody>
        {
            //we loop through the students array and create an each student row.
            props.students
            .map(student =>
                (
                    <tr key={student.id}>
                        <td>
                            {student.fullName}
                        </td>
                        {/* when we click on the 'Details' cell, we call selectStudent*/}
                        <td onClick= {() => props.selectStudent(student)}>
                            Details
                        </td>
                    </tr>
                )
            )
        }
        </tbody>
    )
}

export default StudentList
