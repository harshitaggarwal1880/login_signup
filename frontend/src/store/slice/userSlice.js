import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

let accessToken = null;
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
    accessToken = data.accesstoken;
  } catch (error) {
    console.log(error);
  }
};

// aaa();

console.log(" insoide Slice ");

const userSlice = createSlice({
  name: "user",
  initialState: {
    userid: "",
    name: "",
    accesstoken: "",
    // logged: null,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accesstoken = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    loginUser: (state, action) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const { setAccessToken, setName, loginUser } = userSlice.actions;

export default userSlice.reducer;
