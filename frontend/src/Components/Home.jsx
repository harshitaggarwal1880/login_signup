import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  console.log("Initl");
  useEffect(() => {
    // console.log(user);
    //   try {
    //     // accessToken = Cookies.get("refreshToken");
    //     console.log("toeknnnnnn",Cookies.get("refreshToken"));
    //   } catch (error) {
    //     console.log(error);
    //   }
  }, []);

  return (
    <div className="h-[90%] flex flex-col justify-center items-center text-[5vw] font-bold">
      <div> Home Page</div>
      <div>(Public Page)</div>
    </div>
  );
};

export default Home;
