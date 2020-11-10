import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";
import  jwt_decode from 'jwt-decode';

export const registerUser = (userData, history) => async dispatch => {
await axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = userData => async dispatch => {
 await  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      setAuthToken(token);
      const decoded = jwt_decode(token);

      //sets current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};


export const logOutUser=()=>dispatch=>{
localStorage.removeItem('jwtToken')
// remove auth header for future reqs
setAuthToken(false)
dispatch(setCurrentUser({}))
}
