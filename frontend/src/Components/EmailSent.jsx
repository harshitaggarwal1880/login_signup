import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmailSent = () => {
  const [code, setcode] = useState(0);
  const navigate = useNavigate();
  const verify = async () => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_HOST}/checkemail`,
      {},

      { withCredentials: true }
    );

    if (data.error) {
      toast.error("Please Login again");
      navigate("/login");
    } else if (data.code === 2) {
      toast.success("You already verfified");
      navigate("/");
    } else if (data.code === 1) {
      setcode(1);
      toast.success("Verification Email Already Sent");
    } else if (data.code === 0) {
      setcode(0);
      toast.success("Verification Email Sent");
    }
  };

  const handleresend = async () => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_HOST}/resend`,
      {},

      { withCredentials: true }
    );

    if (data.error) {
      toast.error("Please Login again");
      navigate("/login");
    } else {
      toast.success("Verification Email Resend !");
    }
  };

  useEffect(() => {
    verify();
  }, []);

  return (
    <div className="h-[90%] flex flex-col justify-center items-center gap-4 ">
      <div className="text-[5vw] font-bold">
        {code ? (
          <div className="text-center">
            <h1>Verification email already sent </h1>
          </div>
        ) : (
          <div className="text-center">
            <div>Verification Email sent</div>
          </div>
        )}
      </div>

      <div>
        If you don't recieve any email , then please click on resend button
      </div>
      <button
        onClick={handleresend}
        className="text-[2vw] bg-lime-600 rounded-lg text-white px-4 py-2"
      >
        {" "}
        Resend{" "}
      </button>
    </div>
  );
};

export default EmailSent;
