import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "./../../actions/authActions";
import TextFields from "../commons/textFields";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const loginUser = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(loginUser);
  };

  async componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      await this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Login</h1>
              <p className="lead text-center">Sign in to your account</p>
              <form onSubmit={this.onSubmit}>
                <TextFields
                  placeholder="Email address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  errors={errors.email}
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
  { loginUser }
)(Login);
