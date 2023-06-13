import axios from "axios";

const baseUrl = "http://192.168.0.215:5000";

export const validateUser = async (token) => {
  try {
    const res = await axios.get(`${baseUrl}/api/users/auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
