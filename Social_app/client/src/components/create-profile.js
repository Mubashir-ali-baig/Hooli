 import React, { Component } from "react";
import { connect } from "react-redux";
import TextFields from "./commons/textFields";
import SelectList from "./commons/selectList";
import TextArea from "./commons/textArea";
import InputGroup from "./commons/inputGroup";
import { createProfile } from "../actions/profileActions";


class CreateProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: "",
    website: "",
    bio: "",
    status: "",
    githubProfile: "",
    skills: "",
    linkedin: "",
    facebook: "",
    youtube: "",
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

componentWillReceiveProps(nextProps) {
    if(nextProps.errors){
        this.setState({errors:nextProps.errors})
    }

}

  onSubmit = e => {
    e.preventDefault();
    const profileInfo={ 
          handle:this.state.handle,
          website:this.state.website,
          bio:this.state.bio,
          status:this.state.status,
          githubProfile:this.state.githubProfile,
          skills:this.state.skills,
          linkedin:this.state.linkedin,
          facebook:this.state.facebook,
          youtube:this.state.youtube
    }

    this.props.createProfile(profileInfo,this.props.history)
    };

  render() {
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="linkedin profile link"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            errors={errors.linkedin}
          />
          <InputGroup
            placeholder="facebook profile link"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            errors={errors.facebook}
          />
          <InputGroup
            placeholder="Youtube profile link"
            name="Youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            errors={errors.youtube}
          />
        </div>
      );
    }

    // Select options for status
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Profile</h1>
              <p className="lead text-center">Input some info related to you</p>
              <form onSubmit={this.onSubmit}>
                <TextFields
                  placeholder="Profile handle"
                  name="handle"
                  value={this.state.value}
                  onChange={this.onChange}
                  errors={errors.handle}
                  info="A unique handle for profile eg: nickname,fullname etc"
                />
                <SelectList
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  errors={errors.status}
                  info="Give us an idea of where you are at in your career"
                />
                <TextFields
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  errors={errors.website}
                  info="Could be your own website or a company one"
                />
                <TextFields
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  errors={errors.skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                />

                <TextArea
                  placeholder="Short bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  errors={errors.bio}
                  info="Tell us about yourself"
                />

                <TextFields
                  placeholder="Github profile"
                  name="githubProfile"
                  value={this.state.githubProfile}
                  onChange={this.onChange}
                  errors={errors.githubProfile}
                  info="If you want your latest repos and a Github link, include your username"
                />

                <div className="mb-3">
                  <button
                  type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-3"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{createProfile})(CreateProfile);
