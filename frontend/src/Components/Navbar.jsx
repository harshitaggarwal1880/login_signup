import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAccessToken, setName } from "../store/slice/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handlelogout = async () => {
    await axios.post(
      `${process.env.REACT_APP_HOST}/logout`,
      {},
      { withCredentials: true }
    );
    axios.defaults.headers.common["Authorization"] = null;
    dispatch(setAccessToken(null));
    dispatch(setName(null));

    navigate("/login");
  };

  return (
    <div className="bg-black text-white">
      <ul className="flex justify-center items-center gap-4 p-2">
        <Link to="/">
          <li className="px-4 py-2 rounded-lg hover:bg-sky-800"> Home</li>
        </Link>
        <Link to="/content">
          <li className="px-4 py-2 rounded-lg hover:bg-sky-800"> Content </li>
        </Link>
        {!user.accesstoken ? (
          <>
            <li className="px-4 py-2 rounded-lg hover:bg-sky-800">
              <Link to="/signup"> Register</Link>
            </li>
            <li className="px-4 py-2 rounded-lg hover:bg-sky-800">
              <Link to="/login"> Login</Link>
            </li>
          </>
        ) : (
          <li className="px-4 py-2 rounded-lg hover:bg-sky-800">
            <button onClick={handlelogout}> Logout</button>
          </li>
        )}
        {
          user.name && 
          <li>
            <div>
              {user.name.length > 10
                ? user.name.slice(0, 10) + "..."
                : user.name}
            </div>
          </li>
        }
      </ul>
    </div>
  );
};

export default Navbar;
