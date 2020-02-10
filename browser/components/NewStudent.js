import React, { Component } from 'react';

// NewStudent is our FORM which we are rendering in our MAIN component

class NewStudent extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // event represents the INPUT button - we're trying to capture the changes as someone types
  handleChange(event) {
    // console.log(event.target) to see changes as we type
    // console.log (this.state) to see the state changing as we tpye
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // htmlFor associates the label tag with the input tag
  // we can either write <label></label> then <input />  or nest the input within label
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            name="firstName"
            type="text"
            value={this.state.firstName}
            onChange={this.handleChange}
          />

          <label htmlFor="lastName" value={this.state.lastName}>
            Last Name
          </label>
          <input
            name="lastName"
            type="text"
            value={this.state.lastName}
            onChange={this.handleChange}
          />

          <label htmlFor="Email">Email</label>
          <input
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

export default NewStudent;
