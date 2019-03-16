import React, { Component } from 'react';
import axios from 'axios';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: []
    };
  }
  async componentDidMount() {
    let { data } = await axios.get('/student');
    this.setState({ students: data });
  }

  render() {
    return (
      <div>
        <h1>Students</h1>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
            </tr>
            {this.state.students.map(student => {
              return (
                <tr key={student.id}>
                  <td>{student.fullName}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
