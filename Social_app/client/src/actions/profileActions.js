import axios from "axios";
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_CURRENT_PROFILE
} from "./types";

export const getCurrentProfile = () => async dispatch => {
  dispatch(setProfileLoading());

  await axios
    .get("/api/profiles")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )

    .catch(err =>
      dispatch({
        type: GET_PROFILE, //here a profile may not exist so we pass an empty object rather than sending an error
        payload: {}
      })
    );
};

export const getProfileByHandle = handle => async dispatch => {
  dispatch(setProfileLoading());
  await axios
    .get(`/api/profiles/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )

    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

//all profiles
export const getProfiles = () => async dispatch => {
  dispatch(setProfileLoading());
  await axios
    .get("/api/profiles/all")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

export const deleteAccount = () => async dispatch => {
  if (window.confirm("Are you sure? This CANNOT be undone! ")) {
    await axios
      .delete("/api/profiles")
      .then(res => {
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        });
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  }
};

export const createProfile = (data, history) => async dispatch => {
  await axios
    .post("/api/profiles", data)
    .then(() => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addExperience = (data, history) => async dispatch => {
  await axios
    .post("/api/profiles/experience", data)
    .then(() => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteExperience = id => async dispatch => {
  await axios
    .delete(`/api/profiles/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
