import React from "react";
import { Link } from 'react-router-dom';

const ProfileFeatures = () => {
  return (
    <div className="btn-group mb-4">
      <Link to="/edit-profile" className="btn btn-light ">
        <i className="fa fa-user-circle text-info mr-1" />
        Edit Profile
      </Link>
      <Link to="/add-experience"  className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1" />
        Add Experience
      </Link>
    </div>
  );
};

export default ProfileFeatures;
