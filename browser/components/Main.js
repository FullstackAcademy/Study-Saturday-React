import React, { Component } from 'react';
import axios from 'axios';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
    };
  }

  componentDidMount() {
    console.log('------IN COMPONENT DID MOUNT-------');
    this.getStudents();
  }

  async getStudents() {
    try {
      const { data } = await axios.get('/student');
      this.setState({
        students: data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log('------IN THE RENDER---------');
    console.log('STATE----->', this.state);
    const {students} = this.state
    // const students = this.state.students

    return (
      <div>
        <h1>Students</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              return <tr key={student.id}>{student.fullName}</tr>;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
