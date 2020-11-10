import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "./../../actions/authActions";
import TextFields from "./../commons/textFields";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    this.props.registerUser(newUser, this.props.history);
  };

  async componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      await this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFields
                  placeholder="Enter name"
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.onChange}
                  errors={errors.name}
                />

                <TextFields
                  placeholder="Email address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  errors={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />

                <TextFields
                  placeholder="Enter password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  errors={errors.password}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapSateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapSateToProps,
  { registerUser }
)(Register)