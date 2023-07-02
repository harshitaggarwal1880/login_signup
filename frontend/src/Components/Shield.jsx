import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { setAccessToken, setName } from "../store/slice/userSlice";

const Shield = ({ children }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
console.log("Shield")
  const aaa = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");

      console.log(refreshToken);

      const { data } = await axios.post(
        `${process.env.REACT_APP_HOST}/refresh_token`,
        {},
        { withCredentials: true }
      );

      console.log(data);
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + data.accesstoken;
      dispatch(setAccessToken(data.accesstoken));
      dispatch(setName(data.user.name));

    } catch (error) {
      console.log(error);
    }
  };

//   useEffect(() => {
    aaa();
//   }, []);

  return children;
};

export default Shield;
