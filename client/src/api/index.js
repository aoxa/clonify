import axios from "axios";

export const validateUser = async (token) => {
  const baseUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

  try {
    const res = await axios.get(`${baseUrl}/api/users/auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res);

    window.sessionStorage.setItem("token", token);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async (token) => {
  const baseUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

  try {
    const response = await axios.get(`${baseUrl}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
