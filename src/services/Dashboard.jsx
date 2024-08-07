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

export const beneficiaries2 = async (id) => {
  const { data } = await Axios.get(
    `${baseurl}/getuserbeneficiaries?userId=${
      id?.queryKey[0] || 68059751
    }&beneficiaryId=${id?.queryKey[1] || 0}`
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
    `${baseurl}/getusertransactionlog/${userId?.queryKey[0]}`
  );
  return data;
};

export const TranxId = async (userId) => {
  console.log(
    "🚀 ~ file: Dashboard.jsx:31 ~ Tranx ~ userId:",
    userId?.queryKey[0]
  );
  const { data } = await Axios.get(
    `${baseurl}/transaction.do?transactionId=${userId?.queryKey[0]}`
  );
  return data;
};

export const Tranx2 = async (userId) => {
  const { data } = await Axios.get(
    `${baseurl}/getusertransactionlog/${userId}`
  );
  return data;
};
export const notifs = async (userId) => {
  const { data } = await Axios.get(`${baseurl}/getnotifications/${userId}`);
  return data;
};
export const updateNotif = async (body) => {
  console.log("🚀 ~ file: Dashboard.jsx:32 ~ createBeneficiary ~ body:", body);
  const { data } = await Axios.post(`${baseurl}/updatenotiifcation`, body);
  return data;
};

export const disallowusermulticurrency = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/disallowusermulticurrency/${body}`
  );
  return data;
};
export const allowusermulticurrency = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/allowusermulticurrency/${body}`
  );
  return data;
};

export const confirmPayment = async (body) => {
  console.log("🚀 ~ file: Dashboard.jsx:32 ~ createBeneficiary ~ body:", body);
  const { data } = await Axios.post(`${baseurl}/bosmcc/${body}`);
  return data;
};

export const TransferPurpose = async () => {
  const { data } = await Axios.get(`${baseurl}/gettransferpurpose`);
  return data;
};
export const getCompanyBanks = async (userId, bid) => {
  const { data } = await Axios.get(`${baseurl}/getsystemofflinepaymentbanks`);
  return data;
};
export const Paymentchannel = async (id) => {
  const { data } = await Axios.get(
    `${baseurl}/getsendingcurrencypaymentchannel/${id?.queryKey[0]}`
  );
  return data;
};

export const Payoutchannel = async () => {
  const { data } = await Axios.get(`${baseurl}/getpayoutchannel`);
  return data;
};

export const PayoutchannelSend = async (id) => {
  const { data } = await Axios.get(
    `${baseurl}/getreceivingcurrencypayoutchannel/${id?.queryKey[0]}`
  );
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

export const GetDetailes = async () => {
  console.log("🚀 ~ file: Dashboard.jsx:57 ~ GetDetails ~ id:");
  const { data } = await Axios.get(
    `${baseurl}/getuserdashboard/${Userdata?.data?.user?.userId}`
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

export const DashboardTodayRates = async (query) => {
  const q = query?.queryKey;
  const { data } = await Axios.get(
    `${baseurl}/gettodaysrate?fromCurrencyId=${0}&toCurrencyId=${0}&roleId=${
      q[0] || Userdata?.data?.user?.role?.id
    }&userId=${q[1] || Userdata?.data?.user?.userId}`
  );
  return data;
};

export const DashboardTodayRatesAgent = async (query) => {
  const q = query?.queryKey;
  const { data } = await Axios.get(
    `${baseurl}/getagenttodaysrate?fromCurrencyId=${0}&toCurrencyId=${0}&agentId=${
      q[0] || Userdata?.data?.user?.agentId || Userdata?.data?.user?.userId
    }&userId=${q[1] || Userdata?.data?.user?.userId}`
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
export const deleteuserbeneficiary = async (body) => {
  console.log("🚀 ~ file: Dashboard.jsx:32 ~ createBeneficiary ~ body:", body);
  const { data } = await Axios.post(`${baseurl}/deleteuserbeneficiary/${body}`);
  return data;
};
export const createBeneficiaryAgent = async (body) => {
  console.log("🚀 ~ file: Dashboard.jsx:32 ~ createBeneficiary ~ body:", body);
  const { data } = await Axios.post(
    `${baseurl}/agentaddcommissionbankdetails`,
    body
  );
  return data;
};

export const userwithdrawalrequest = async (body) => {
  console.log("🚀 ~ file: Dashboard.jsx:32 ~ createBeneficiary ~ body:", body);
  const { data } = await Axios.post(`${baseurl}/userwithdrawalrequest`, body);
  return data;
};

export const getagentaddcommissionbankdetails = async (id) => {
  const { data } = await Axios.get(
    `${baseurl}/getuserbeneficiaries?userId=${
      id?.queryKey[0] || 68059751
    }&beneficiaryId=${0}`
  );
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

export const processKyc = async (body) => {
  const { data } = await Axios.post(`${baseurl}/processkyc`, body);
  return data;
};
export const processKycBene = async (body) => {
  const { data } = await Axios.post(`${baseurl}/processbeneficiarykyc`, body);
  return data;
};
export const generateJourneyToken = async (body) => {
  const { data } = await Axios.post(`${baseurl}/GetGBGAccessToken`, body);
  return data;
};

export const confirmKyc = async (from) => {
  const { data } = await Axios.post(`${baseurl}/GBGKYCWebHookHandler`, from);
  return data;
};
