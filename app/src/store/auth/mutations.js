/*
export function someMutation (state) {
}
*/

export const setCredential = (state, payload) =>  {
  state.credentials.token = payload.jwt_token;
  state.credentials.userInfo = payload.userInfo;
  if (!payload.userInfo.otp_enabled) {
    state.credentials.authenticated = payload.authenticated || true;
  }
}

export const setOtp = (state, payload) => {
  state.credentials.userInfo = { ...state.credentials.userInfo, otp_enabled: payload}
}

export const validateOtp = (state, payload) => {
  state.credentials.authenticated = payload;
}