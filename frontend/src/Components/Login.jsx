import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginRoute } from "../Utils/APIRoutes";
import axios from "axios";
import LoginContainer from "../Styles/LoginContainer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setAccessToken } from "../store/slice/userSlice";

const Login = () => {
  const [email, setemail] = useState("");

  const [password, setpassword] = useState("");

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  // ---- Mouse Event eyes handeling ---------
  const [x, setx] = useState(5);
  const [y, sety] = useState(5);
  const handleMouseMove = (event) => {
    setx((event.clientX * 100) / window.innerWidth);
    sety((event.clientY * 100) / window.innerHeight);
  };

  const handleValidation = () => {
    if (email === "") {
      // toast.error("Email is required", toastOptions);
      toast.error("Email is required");
      return false;
    } else if (password === "") {
      // toast.error("Password is required", toastOptions);
      toast.error("Password is required");
      return false;
    } else {
      return true;
    }
  };

  const handelsubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_HOST}/login`,
          {
            useremail: email,
            userpassword: password,
          },
          { withCredentials: true }
        );
        console.log(data);

        if (data.error) {
          toast.error(data.error);
        } else if (!data.verify) {
          navigate("/emailsent");
        } else if (data.accesstoken) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + data.accesstoken;
          dispatch(setAccessToken(data.accesstoken));
          toast.success(data.message);
          navigate("/");
        } else {
          toast.error(data.error);
        }
      } catch (error) {
        console.log(error);
        toast.error("Invalid Credentials");
      }
    }
  };

  return (
    <>
      <LoginContainer>
        <div className="body" onMouseMove={handleMouseMove}>
          <div className="wrapper">
            <main>
              <section>
                <div className="login-container">
                  <div className="email-login">
                    <div className="login-h-container">
                      <h1 className="text-[2rem] font-bold">
                        Login to your account
                      </h1>
                      <p>
                        Don’t have an account?{" "}
                        <Link to="/signup">Sign up Free!</Link>
                      </p>
                    </div>
                    <form onSubmit={handelsubmit}>
                      <label htmlFor="email">
                        <input
                          className="border border-solid border-black"
                          id="email"
                          name="email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setemail(e.target.value);
                          }}
                          placeholder=""
                        />
                        {!email && <span id="span-email">Email</span>}
                      </label>
                      <label htmlFor="password">
                        <input
                          className="border border-solid border-black"
                          id="password"
                          name="password"
                          type="password"
                          value={password}
                          onChange={(e) => {
                            setpassword(e.target.value);
                          }}
                          placeholder=""
                        />
                        {!password && <span id="span-password">Password</span>}
                      </label>
                      <div className="recovery">
                        <div>
                          <input
                            type="checkbox"
                            id="remember"
                            name="remember"
                          />
                          <label htmlFor="remember">Remember me</label>
                        </div>
                        <a href="">Forgot Password?</a>
                      </div>
                      <input type="submit" value="Login with Email" />
                    </form>
                  </div>
                </div>
              </section>
              <div className="vector-1"></div>
              <div className="vector-2"></div>
              <div className="vector-3"></div>
            </main>
          </div>
        </div>
      </LoginContainer>
      {/* <ToastContainer/> */}
      {/* <Toaster/> */}
    </>
  );
};

export default Login;
