import React, { Component } from "react";
import ProfileAbout from "./profileAbout";
import ProfileHeader from "./profileHeader";
import ProfileGithub from "./profileGithub";
import ProfileExperience from './profileExp';
import Spinner from "./../commons/spinner";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfileByHandle } from "../../actions/profileActions";


class Profile extends Component {
  componentDidMount() {
   console.log("HEloooo",this.props.match.params.handle)

    if (this.props.match.params.handle) {
      console.log("hello")
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
          </div>
          <ProfileHeader profile={profile}/>
           <ProfileAbout profile={profile} />
         <ProfileExperience experience={profile.experience} /> 
          {profile.githubProfile ? (
            <ProfileGithub username={profile.githubProfile} />
          ) : null} 
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
