import React, { Component } from 'react';
import axios from 'axios';
// DONT FORGET TO IMPORT THUNK AND CONNECT
import { fetchStudentsThunk } from '../store';
import { connect } from 'react-redux';

import StudentList from './StudentList.js';
import SingleStudent from './SingleStudent.js';
import NewStudentForm from './NewStudentForm.js';

// renamed Main to disconnectMain
class DisconnectedMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      selectedStudent: {},
      showStudent: false
    };

    this.selectStudent = this.selectStudent.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addStudent = this.addStudent.bind(this);
  }

  componentDidMount() {
    this.props.fetchStudents();
    this.setState({
      students: this.props.students
    });
  }

  selectStudent(student) {
    return this.setState({
      selectedStudent: student
    });
  }

  // we want to add the student to our backend DB
  // sinc we already have students on our state, we should spread those new students out on a new array,
  // then add our student (data)
  async addStudent(student) {
    try {
      const { data } = await axios.post('/student', student);

      return this.setState({
        students: [...this.state.students, data],
        showStudent: false
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleClick(e) {
    return this.setState({
      showStudent: !this.state.showStudent
    });
  }

  render() {
    console.log('this is the state in main', this.state);
    return (
      <div>
        <h1>Students</h1>
        <button onClick={this.handleClick}>Add Student</button>
        {this.state.showStudent ? (
          <NewStudentForm addStudent={this.addStudent} />
        ) : null}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Tests</th>
            </tr>
          </thead>
          <StudentList
            // we change students={this.state.students} to students={this.props.students}
            // we'll eventually change all from state ==> props
            students={this.props.students}
            selectStudent={this.selectStudent}
          />
        </table>
        {this.state.selectedStudent.id ? (
          <SingleStudent student={this.state.selectedStudent} />
        ) : null}
      </div>
    );
  }
}
// We are bringing in parts of state and dispatch through hMSTP and MDTP
// in order for THIS component to have access to them
const mapStateToProps = state => {
  return {
    students: state.students
  };
};

// to bring in our thunk
// DISPATCH IS JUST A METHOD REDUX GIVES US

// fetchStudenmts dispatchs the thunk
// fetchStudentsThunk
const mapDispatchToProps = dispatch => {
  return {
    // thunk
    fetchStudents: () => dispatch(fetchStudentsThunk())
  };
};

// CONNECT is whats really passing the props to our new Main component
// it's 'connecting' our component to the store (state)
// we don't have access to anything from the store until we run connect()
// under the hood, connect runs the functions, apply the results onto props
const Main = connect(mapStateToProps, mapDispatchToProps)(DisconnectedMain);

export default Main;
