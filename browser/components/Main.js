import React, { Component } from 'react';
import axios from 'axios';

import StudentList from './StudentList';
import SingleStudent from './SingleStudent'

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      student: {},
    };

    this.selectedStudent = this.selectedStudent.bind(this)
  }

  componentDidMount() {
    this.getStudents();
  }

  async getStudents() {
    console.log('fetching');
    try {
      const { data } = await axios.get('/student');
      this.setState({ students: data });
    } catch (err) {
      console.error(err);
    }
  }

  selectedStudent (student) {
    return this.setState({
      student : student
    })
  }

  render() {
    console.log('STATE IN MAIN', this.state);
    return (
      <div>
        <h1>Students</h1>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Title</th>
            </tr>
            <StudentList
              students={this.state.students}
              student={this.selectedStudent}
            />
          </tbody>
        </table>
        {this.state.student.id ? <SingleStudent student={this.state.student}/> : <h1>No Student Was Selected </h1>}
      </div>
    );
  }
}
