import React, { Component } from "react";
import Moment from "react-moment";

class ProfileExperience extends Component {
  render() {
    const { experience } = this.props;
    const expItems = experience.map(exp => (
      <li className="list-group-item text-center">
        <h4>{exp.company}</h4>
        <p>
          <Moment format="DD/MM/YY">{exp.from}</Moment>
          {exp.current ? (
            " present"
          ) : (
            <Moment format="DD/MM/YY">{exp.to}</Moment>
          )}
        </p>
        <p>
          <strong>Position:</strong> {exp.position}
        </p>
      </li>
    ));
    return (
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center text-info">Experience</h3>
          {expItems.length > 0 ? (
            <ul className="list-group ">{expItems}</ul>
          ) : (
            <p className="text-center">No Experience Listed</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileExperience;
