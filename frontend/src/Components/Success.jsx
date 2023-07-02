import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Success = () => {
  const { tag } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, []);

  return (
    <div className="h-[90vh] flex justify-center items-center text-[4vw] font-bold">
      {tag === "verify" ? (
        <div> Email Verified !</div>
      ) : (
        <div className=""> Email Already Verified !</div>
      )}
    </div>
  );
};

export default Success;
