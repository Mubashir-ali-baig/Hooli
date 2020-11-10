import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "./../commons/spinner";
import { getProfiles } from "../../actions/profileActions";
import ProfileItem from "./profileItem";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;
    if (profiles == null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem profile={profile} />
        ));
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Profiles</h1>
              <p className="lead text-center">Coonect with developers</p>
              {profileItems}
            </div>
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

export default connect(mapStateToProps,{getProfiles})(Profiles);
