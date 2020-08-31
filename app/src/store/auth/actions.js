/*
export function someAction (context) {
}
*/

import API from "../api";

export const register = async ({ commit }, payload) => {
    try {
      let response = await API.post("/auth/register", {
        name: payload.fullname,
        email: payload.emailaddress,
        username: payload.username,
        password: payload.password,
        confirm_password: payload.confirmpassword
      });
      return response;
    } catch (e) {
      return e;
    }
};
