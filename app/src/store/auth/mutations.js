/*
export function someMutation (state) {
}
*/

export const setCredential = (state, payload) =>  {
  state.credentials.authenticated = true;
  state.credentials.token = payload.jwt_token;
  state.credentials.userInfo = payload.userInfo;
}
