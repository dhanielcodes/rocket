import { Axios } from "../utils/Axios";
import { BASE_URL } from "../../config/config";

const baseurl = BASE_URL;
const Userdata = JSON.parse(localStorage?.getItem("userDetails"));

// user login
export const userLogin = async (body) => {
  const { data } = await Axios.post(`${baseurl}/auth`, body);
  console.log(body);
  return data;
};

export const forgotPassword = async (body) => {
  const { data } = await Axios.post(`${baseurl}/InitiateForgotPassword`, body);
  console.log(body);
  return data;
};

export const updateProfilePicture = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/updateUserprofilepicture/${Userdata?.data?.user?.userId}`,
    body
  );
  return data;
};

export const uploadFile = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/FileUploadAPI/${body.id}`,
    body.file
  );
  return data;
};
// create bank account
export const createUser = async (body) => {
  const { data } = await Axios.post(`${baseurl}/signup`, body);
  return data;
};
export const updatePassword = async (body) => {
  const { data } = await Axios.post(`${baseurl}/updateuserpassword`, body);
  return data;
};

export const countries = async () => {
  const { data } = await Axios.get(`${baseurl}/getcountries`);
  return data;
};
export const getCurrencies = async () => {
  const { data } = await Axios.get(`${baseurl}/getcurrency`);
  return data;
};
export const getUserCurrencies = async () => {
  const { data } = await Axios.get(
    `${baseurl}/getusercurrency/${Userdata?.data?.user?.userId}`
  );
  return data;
};
export const checkEmail = async (body) => {
  const { data } = await Axios.get(`${baseurl}/checkUserExistByEmail`, body);
  console.log("🚀 ~ file: Auth.jsx:37 ~ checkEmail ~ data:", data);
  return data;
};
export const profession = async () => {
  const { data } = await Axios.get(`${baseurl}/getprofession`);
  return data;
};

export const employment = async () => {
  const { data } = await Axios.get(`${baseurl}/getemploymentstatus`);
  return data;
};

export const GetToken = async (id) => {
  console.log("🚀 ~ file: Auth.jsx:56 ~ GetToken ~ id:", id);
  const { data } = await Axios.get(
    `${baseurl}/getsumsubaccesstoken?userId=${id?.queryKey[0]}`
  );
  return data;
};

export const states = async (cid, sid) => {
  const { data } = await Axios.get(
    `${baseurl}/getstates?countryId=${cid || 0}&stateId=${sid || 1}`
  );
  return data;
};

export const cities = async (cid, sid, ciid) => {
  const { data } = await Axios.get(
    `${baseurl}/getcities?countryId=${cid || 0}&stateId=${sid || 0}&citiId=${
      ciid || 0
    }`
  );
  return data;
};

// register user
export const registerUser = async (body) => {
  const { data } = await Axios.post(`${baseurl}account/signup/`, body);
  return data;
};
