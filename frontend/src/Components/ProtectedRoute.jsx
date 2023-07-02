import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAccessToken, setName } from "../store/slice/userSlice";
import Loading from "./Loading";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  // const [loader, setloader] = useState(true);
  const [isAuth, setisAuth] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_HOST}/protected`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.accesstoken}`,
          },
        },
        { withCredentials: true }
      );

      console.log(data);

      if (data.error) {
        const { data } = await axios.post(
          `${process.env.REACT_APP_HOST}/refresh_token`,
          {},
          { withCredentials: true }
        );

        if (data.error) {
          navigate("/login");
          dispatch(setName(null));
        }
        console.log(data);
        setisAuth(true);

        dispatch(setAccessToken(data.accesstoken));
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + data.accesstoken;
      } else if (!data.verify) {
        navigate("/emailsent");
      } else {
        setisAuth(true);
      }
    };

    verify();
  }, []);

  return isAuth ? children : <Loading/>;
};

export default ProtectedRoute;
