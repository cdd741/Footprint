const URL = "http://localhost:8080";

export const signupUrl = () => `${URL}/user/signup`;
export const signinUrl = () => `${URL}/user/signin`;
export const uploadUrl = () => `${URL}/post`;
export const getPostByIdUrl = (id) => `${URL}/post/${id}`;
export const getPostUrl = () => `${URL}/post`;
