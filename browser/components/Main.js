import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Main(props){
  const [students, setStudents] = useState([]);

  const getStudents = async () => {
    console.log('fetching');
    try {
      const { data } = await axios.get('/student');
      setStudents(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(()=> {
      getStudents()
    }, [students]
  )

  return (
    <div>
      <h1>Students</h1>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
          </tr>
          {students.map(student => {
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

// export default class Main extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       students: [],
//     };
//   }

//   componentDidMount() {
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

//   render() {
//     return (
//       <div>
//         <h1>Students</h1>
//         <table>
//           <tbody>
//             <tr>
//               <th>Name</th>
//             </tr>
//             {this.state.students.map(student => {
//               return (
//                 <tr key={student.id}>
//                   <td>{student.fullName}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// }
