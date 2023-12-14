/* eslint-disable no-unused-vars */

import { Axios } from "../utils/Axios";
import { BASE_URL } from "../../config/config";

const baseurl = BASE_URL;

const Userdata = JSON.parse(localStorage?.getItem("userDetails"));

export const beneficiaries = async (userId, bid) => {
  const { data } = await Axios.get(
    `${baseurl}/getuserbeneficiaries?userId=${
      userId || 68059751
    }&beneficiaryId=${bid || 0}`
  );
  return data;
};

export const getAgentRates = async (bid) => {
  const { data } = await Axios.get(
    `${baseurl}/agentgetrate?agentId=${
      Userdata?.data?.user?.agentId || Userdata?.data?.user?.userId
    }&rateId=${0}&roleId=${Userdata?.data?.user?.role?.id}`
  );
  return data;
};

export const GetCustomers = async (userId) => {
  const { data } = await Axios.get(
    `${baseurl}/getagentcustomers/${Userdata?.data?.user?.userId}`
  );
  return data;
};

export const getBanks = async (userId, bid) => {
  const { data } = await Axios.get(`${baseurl}/getbanks`);
  return data;
};
export const nameEnquiry = async (query) => {
  console.log(
    "🚀 ~ file: Dashboard.jsx:24 ~ nameEnquiry ~ query:",
    query?.queryKey
  );
  const { data } = await Axios.get(
    `${baseurl}/BankDetailsLookUp?bankCode=${query?.queryKey[0]}&accountNumber=${query?.queryKey[1]}`
  );
  return data;
};

export const Tranx = async (userId) => {
  console.log(
    "🚀 ~ file: Dashboard.jsx:31 ~ Tranx ~ userId:",
    userId?.queryKey[0]
  );
  const { data } = await Axios.get(
    `${baseurl}/getuserlog/${userId?.queryKey[0]}`
  );
  return data;
};

export const Tranx2 = async (userId) => {
  const { data } = await Axios.get(`${baseurl}/getuserlog/${userId}`);
  return data;
};
export const TransferPurpose = async () => {
  const { data } = await Axios.get(`${baseurl}/gettransferpurpose`);
  return data;
};

export const Paymentchannel = async () => {
  const { data } = await Axios.get(`${baseurl}/getpaymentchannel`);
  return data;
};

export const Payoutchannel = async () => {
  const { data } = await Axios.get(`${baseurl}/getpayoutchannel`);
  return data;
};

export const GetDetails = async (id) => {
  console.log(
    "🚀 ~ file: Dashboard.jsx:57 ~ GetDetails ~ id:",
    id?.queryKey[0]
  );
  const { data } = await Axios.get(
    `${baseurl}/getuserdashboard/${id?.queryKey[0]}`
  );
  return data;
};

export const GetUserWalletsTransactions = async (query) => {
  const q = query?.queryKey;
  console.log(q);
  const { data } = await Axios.get(
    `${baseurl}/getuserwalletfundrequest?userId=${Userdata?.data?.user?.userId}&requestId=${Userdata?.data?.user?.role?.id}`
  );
  return data;
};

export const Rates = async (query) => {
  const q = query?.queryKey;
  const { data } = await Axios.get(
    `${baseurl}/getrate?fromCurrencyId=${q[0] || 0}&toCurrencyId=${
      q[1] || 0
    }&fromAmount=${q[2] || 0}&toAmount=${q[3] || 0}&roleId=${
      Userdata?.data?.user?.role?.id
    }&userId=${Userdata?.data?.user?.userId}`
  );
  return data;
};

export const agentCustomerGetRate = async (query) => {
  const q = query?.queryKey;
  const { data } = await Axios.get(
    `${baseurl}//agentcustomersgetrate?fromCurrencyId=${
      q[0] || 0
    }&toCurrencyId=${q[1] || 0}&fromAmount=${q[2] || 0}&toAmount=${
      q[3] || 0
    }&roleId=${Userdata?.data?.user?.role?.id}&agentId=${
      Userdata?.data?.user?.agentId
    }&userId=${Userdata?.data?.user?.userId}`
  );
  return data;
};
export const TodayRates = async (query) => {
  const q = query?.queryKey;
  const { data } = await Axios.get(
    `${baseurl}/gettodaysrate?fromCurrencyId=${q[0] || 0}&toCurrencyId=${
      q[1] || 0
    }&roleId=${Userdata?.data?.user?.role?.id}&userId=${
      Userdata?.data?.user?.userId
    }`
  );
  return data;
};

export const TodayRatesType2 = async (query) => {
  const q = query?.queryKey;
  const { data } = await Axios.get(
    `${baseurl}/gettodaysrate?fromCurrencyId=${q[0] || 0}&toCurrencyId=${
      q[1] || 0
    }&roleId=${Userdata?.data?.user?.role?.id}&userId=${
      Userdata?.data?.user?.userId
    }`
  );
  return data;
};

export const TodayRates2 = async (query) => {
  const q = query?.queryKey;
  const { data } = await Axios.get(
    `${baseurl}/gettodaysrate?fromCurrencyId=${
      q[0]?.fromCountryCurrency?.id || 0
    }&toCurrencyId=${q[0]?.toCountryCurrency?.id || 0}&roleId=${
      Userdata?.data?.user?.role?.id
    }&userId=${Userdata?.data?.user?.userId}`
  );
  return data;
};

export const TodayRatesAgentUpdateRate = async (query) => {
  const q = query?.queryKey;
  console.log(q, "hskk");
  const { data } = await Axios.get(
    `${baseurl}/agentgetrate?fromCurrencyId=${
      q[0]?.fromCountryCurrency?.id || 0
    }&rateId=0&toCurrencyId=${q[0]?.toCountryCurrency?.id || 0}&agentId=${
      Userdata?.data?.user?.agentId || Userdata?.data?.user?.userId
    }`
  );
  return data;
};

export const TodayRatesAgent2 = async (query) => {
  const q = query?.queryKey;
  const { data } = await Axios.get(
    `${baseurl}/getagenttodaysrate?fromCurrencyId=${q[0] || 0}&toCurrencyId=${
      q[1] || 0
    }&agentId=${
      Userdata?.data?.user?.agentId || Userdata?.data?.user?.userId
    }&userId=${Userdata?.data?.user?.userId}`
  );
  return data;
};

export const TodayRatesAgent = async (from, to) => {
  const { data } = await Axios.get(
    `${baseurl}/getagenttodaysrate?fromCurrencyId=${from || 0}&toCurrencyId=${
      to || 0
    }&roleId=${Userdata?.data?.user?.role?.id}&agentId=${
      Userdata?.data?.user?.agentId || Userdata?.data?.user?.userId
    }&userId=${Userdata?.data?.user?.userId}`
  );
  return data;
};

export const createBeneficiary = async (body) => {
  console.log("🚀 ~ file: Dashboard.jsx:32 ~ createBeneficiary ~ body:", body);
  const { data } = await Axios.post(`${baseurl}/adduserbeneficiary`, body);
  return data;
};

export const createWallet = async (body) => {
  const { data } = await Axios.post(`${baseurl}/adduserwallet`, body);
  return data;
};

export const fundWallet = async (body) => {
  const { data } = await Axios.post(`${baseurl}/walletfundingrequest`, body);
  return data;
};
export const sendMoney = async (body) => {
  const { data } = await Axios.post(`${baseurl}/sm`, body);
  return data;
};

export const updateRate = async (body) => {
  const { data } = await Axios.post(`${baseurl}/agentupdaterate`, body);
  return data;
};
export const updateSpecialRate = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/updatecustomerspeacialrate`,
    body
  );
  return data;
};

export const generateJourneyToken = async (body) => {
  const { data } = await Axios.post(`${baseurl}/GetGBGAccessToken`, body);
  return data;
};
