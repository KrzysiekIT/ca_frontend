import axios from "axios";
export default {
  auth: {
    me: () => axios.get("auth/me"),
    login: data => axios.post("auth/login", data),
    users: () => axios.get("auth/users")
  }
};
