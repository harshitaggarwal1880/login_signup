import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerRoute } from "../Utils/APIRoutes";
import LoginContainer from "../Styles/LoginContainer";
import { toast } from "react-toastify";
import { setAccessToken } from "../store/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleValidation = () => {
    if (name === "") {
      toast.error("Name is required ");
      return false;
    } else if (email === "") {
      toast.error("Email is required");
      return false;
    } else if (password.length < 5) {
      toast.error("Password should be equal or greator than 5 characters");
      return false;
    } else if (password !== confirm_password) {
      toast.error("Password and Confirm Password should be same");
      return false;
    } else {
      return true;
    }
  };

  const handelsubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      console.log(name, email, password);
      try {
        const { data } = await axios.post(
          registerRoute,
          {
            username: name,
            useremail: email,
            userpassword: password,
          },
          { withCredentials: true }
        );

        console.log(data);

        if (data.error) {
          toast.error(data.error);
        } else {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + data.accesstoken;
          dispatch(setAccessToken(data.accesstoken));
          toast.success(data.message);
          navigate("/emailsent");
        }
      } catch (error) {
        toast.error("Internal server error");
      }
    }
  };

  return (
    <>
      <LoginContainer>
        <div className="body">
          <div className="wrapper">
            <main>
              <section>
                <div className="login-container">
                  
                  <div className="email-login">
                    <div className="login-h-conta iner">
                      <h1 className="text-[2rem] font-bold">
                        Signup to your account
                      </h1>
                      <p>
                        Already have an account?{" "}
                        <Link to="/login">Login Now</Link>
                      </p>
                    </div>
                    <form onSubmit={handelsubmit}>
                      <label htmlFor="name">
                        <input
                          className="border border-solid border-black"
                          id="name"
                          name="name"
                          type="text"
                          value={name}
                          onChange={(e) => {
                            setname(e.target.value);
                          }}
                          placeholder=""
                          autoComplete="off"
                        />
                        {!name && <span id="span-email">Name</span>}
                      </label>
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
                          // autoComplete="off"
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
                      <label htmlFor="confirm_password">
                        <input
                          className="border border-solid border-black"
                          id="confirm_password"
                          name="confirm_password"
                          type="password"
                          value={confirm_password}
                          onChange={(e) => {
                            setconfirm_password(e.target.value);
                          }}
                          placeholder=""
                        />
                        {!confirm_password && (
                          <span id="span-password">Confirm Password</span>
                        )}
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
                      <input type="submit" value="Signup  with Email" />
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
      {/* <ToastContainer /> */}
    </>
  );
};

export default Signup;
