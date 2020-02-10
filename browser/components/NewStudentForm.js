import React, { Component } from 'react';

export default class NewStudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // handleChange is updating all fields of our state within the function
  // so.. this.state IS our new student
  // reset our state once
  handleSubmit(event) {
    event.preventDefault();

    this.props.addStudent(this.state);
    this.setState({
      firstName: '',
      lastName: '',
      email: ''
    });
  }

  render() {
    // console.log('PROPS:', this.props);
    // const { addStudent } = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            onChange={this.handleChange}
            value={this.state.firstName}
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            onChange={this.handleChange}
            value={this.state.lastName}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
          />
        </label>

        <button type="submit">Submit New Student</button>
      </form>
    );
  }
}
