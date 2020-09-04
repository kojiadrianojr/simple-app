/*
export function someAction (context) {
}
*/

import API from "../api";

export const register = async ({ commit }, payload) => {
  let response = await API.post("/auth/register", {
    name: payload.fullname,
    email: payload.emailaddress,
    username: payload.username,
    password: payload.password,
    confirm_password: payload.confirmpassword
  });

  return response;
};

export const login = async ({ commit }, payload) => {
  let response = await API.post("/auth/login", {
    username: payload.username,
    password: payload.password
  });
  commit("setCredential", response.data);
  return response;
};

export const logout = async ({ commit }, payload) => {
  commit("setCredential", payload);
  return { title: "Goodbye", desc: "Comeback soon, eh!" };
};

export const manage_otp = async ({ commit }, payload) => {
  try {
    let response = await API.patch(`/auth/manage_otp/${payload.userId}`);
    commit("setOtp", payload.state);
    return response;
  } catch (e) {
    return e;
  }
};

export const validate_otp = async ({ commit }, payload) => {
  try {
    let response = await API.post(`/auth/validate_otp/${payload.userId}`, {otp_token: payload.otp_key});
    commit("validateOtp", response.data.otp_granted)
    return response;
  } catch (e) {
    return e;
  }
};

export const generate_otp = async ({commit}, payload) => {
  try {
    let response = await API.get(`/auth/generate_otp/${payload.userId}`, { headers: { Authorization: `bearer ${payload.jwt_token}` } });
    return response;
  } catch (e) { return e}
}