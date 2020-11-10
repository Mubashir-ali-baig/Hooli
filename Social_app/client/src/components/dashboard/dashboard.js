import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "./../../actions/profileActions";
import { Link } from "react-router-dom";
import Spinner from "./../commons/spinner";
import ProfileFeatures from "./profilefeatures";
import Experience from "./experience";


class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDelete=()=>{
    this.props.deleteAccount()
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardText;
    if (profile == null || loading) {
      dashboardText = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardText = (
          <div>
            <p className="lead text-muted">
              Welcome {user.name}<Link to={`/profile/${profile.handle}`}></Link>
            </p>
            <ProfileFeatures />
            <Experience experience={profile.experience}/>
            <div style={{marginBottom:"60px"}}>
            <button onClick={this.onDelete} className="btn btn-danger"> Delete my account</button>
            </div>
          </div>
        );
      } else {
        dashboardText = (
          <div>
            <p className="lead text-bold">Welcome {user.name}</p>
            <p>You have not made your profile yet</p>
            <Link to="/create-profile" className="btn btn-primary btn-lg">
              Create a Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardText}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapSateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapSateToProps,
  { getCurrentProfile,deleteAccount }
)(Dashboard);
