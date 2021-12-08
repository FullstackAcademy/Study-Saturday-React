import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

import StudentList from './StudentList.js';
import SingleStudent from './SingleStudent.js';
import { set } from 'core-js/core/dict';

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

  useEffect(() => {
    getStudents()
  })

  const selectStudent = (student) => {
  //in React we can just ask it nicely to change our state by using .setState
  //we CAAAN'T just overwrite our previous state like that
  //this.state.selectedStudent = student;
  return setSelectedStudent(student);
  }

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



// export default class Main extends Component {
//   //that's how we pass our props in class components: DON'T FORGET TO USE SUPER!
//   constructor(props) {
//     super(props);
//     //state is somethign that is going to make the whole render block
//     //to 'rerender' every time we update info in it
//     this.state = {
//       students: [],
//       selectedStudent: {},
//     };

//     //we need to manually bind this method to the value of this
//     this.selectStudent = this.selectStudent.bind(this);
//   }

//   componentDidMount() {
//     //componentDidMount is going to run once at the beginning
//     this.getStudents();
//   }

//   async getStudents() {
//     console.log('fetching');
//     try {
//       const { data } = await axios.get('/student');
//       this.setState({ students: data });
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   selectStudent(student) {
//     //in React we can jsut ask it nicely to change our state by using .setState
//     //we CAAAN'T just overwrite our previous state like that
//     //this.state.selectedStudent = student;
//     return this.setState({
//       selectedStudent: student,
//     });
//   }

//   render() {
//     return (
//       <div>
//         <h1>Students</h1>
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Tests</th>
//             </tr>
//           </thead>
//           {/* we pass students from our state and selecStudent method to
//           the StudentList component, so we can access both of them in StudentList
//           component's props */}
//           <StudentList
//             students={this.state.students}
//             selectStudent={this.selectStudent}
//           />
//         </table>
//         {/* we check if selectedStudent exists, aka if we clicked on any
//         of the students. if it does, then it's going to be rendered on our page
//         since our state has changed.
//         we pass our selectedStudent object down to the SingleStudent component.*/}
//         {this.state.selectedStudent.id ? (
//           <SingleStudent student={this.state.selectedStudent} />
//         ) : null}
//       </div>
//     );
//   }
// }
