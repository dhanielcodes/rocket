import React, { useEffect, useState } from "react";
import Userlayout from "../../reuseables/Userlayout";
import WalletCard from "../../reuseables/walletCard";
import { styled } from "styled-components";
// import Kyc from '../../reuseables/Kyc'
import { Carousel } from "@arco-design/web-react";
import { useQuery } from "@tanstack/react-query";
import { GetDetails } from "../../services/Dashboard";
import AmountFormatter from "../../reuseables/AmountFormatter";
import { countryObjectsArray } from "../../../config/CountryCodes";
import { Link } from "react-router-dom";
import { Tranx } from "../../services/Dashboard";
import { Transactions as Trnx } from "../../../config/Test";

function Wallet() {
  const Userdata = JSON.parse(localStorage?.getItem("userDetails"));

  const [getWallet, setWallet] = useState(null);

  const {
    data: newDetails,
    isLoading: newDetailsloading,
    refetch: refetchnewDetails,
  } = useQuery({
    queryKey: [Userdata?.data?.user?.userId],
    queryFn: GetDetails,
    onSuccess: (data) => {
      setWallet(data?.data?.wallet);
    }, // refetchInterval: 10000, // fetch data every 10 seconds
    onError: (err) => {
      // navigate("/")
      //   setMessage(err.response.data.detail || err.message);
      //   setOpen(true);
    },
  });

  const [userData, setUserData] = useState(null);
  const {
    data: nameEnq,
    isLoading: namEnqloading,
    refetch: refetchnameEnq,
  } = useQuery({
    queryKey: [userData?.data?.user?.userId],
    queryFn: Tranx,
    onError: (err) => {
      console.error(err);
    },
  });

  useEffect(() => {
    const userDataFromLocalStorage = JSON.parse(
      localStorage.getItem("userDetails")
    );
    setUserData(userDataFromLocalStorage);
  }, []);

  useEffect(() => {
    // Check if nameEnq is available and not loading
    if (nameEnq && !namEnqloading) {
      console.log("🚀 ~ file: History.jsx:95 ~ History ~ nameEnq:", nameEnq);
      // Perform any actions you want to do with nameEnq here
    }
  }, [nameEnq, namEnqloading]);

  const [transactionList, setTransactionList] = useState(
    nameEnq?.data || Trnx?.data
  );

  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredData, setFilteredData] = useState(
    transactionList && transactionList
  );
  console.log(
    "🚀 ~ file: Wallet.jsx:63 ~ Wallet ~ filteredData:",
    filteredData
  );
  const [sortOrder, setSortOrder] = useState("asc"); // or 'desc' for descending
  const [showFilterOptions, setshowFilterOptions] = useState(false);
  const [filterby, setFilerby] = useState("");

  // const objectKeys = Object.keys(filteredData[0]);
  const objectKeys =
    filteredData && filteredData.length > 0 ? Object.keys(filteredData[0]) : [];

  return (
    <Userlayout current="wallet" useBack={true}>
      <Content>
        <div
          className="cont"
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          {/* <WalletCard amount="30000"/>  */}
          <Carousel
            autoPlay
            animation="card"
            showArrow="line"
            indicatorPosition="never"
            style={{ width: "100%", color: "#000" }}
          >
            {getWallet?.map((d, index) => (
              <div key={index}>
                <WalletCard
                  countryName={countryObjectsArray(d?.country?.name)}
                  currency={d?.country?.name + " " + d?.country?.currencyCode}
                  amount={
                    <AmountFormatter
                      currency={d?.country?.currencyCode}
                      value={d?.balance}
                    />
                  }
                />
              </div>
            ))}
          </Carousel>

          {/* <BeneficiaryCont>
                <div className='head'>
                <p>Today</p>
                </div>
                
                    {filteredData?.filter(item=> {
                        if (!searchKeyword.length) return item;
                        else if (Object.values(item).some(value => value.toString().toLowerCase().includes(searchKeyword))) {
                          return item;
                        }
                      }).map(item =>  (
                        <>
                                <Link className='box' to={`/user/transactions/details/?id=${item.sn}`} style={{color:"#000",textDecoration:"none"}}>
                                <Box>
                                
                                {
                                    item?.paymentStatus === "Deposited" ?
                                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="25" cy="25" r="25" fill="#00A85A"/>
                                <path d="M29.6788 19.9334L19.0722 30.54" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M21.1412 19.9508L29.6788 19.9324L29.6611 28.4707" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                    
                                    :
                                
                                    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="26" cy="26" r="25" transform="rotate(-74.6597 26 26)" fill="#F2994A"/>
                                    <path d="M22.4409 31.1983L31.2167 19.0333" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M30.8661 29.8165L22.4411 31.1987L21.0944 22.7672" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                                                
                                }



            
                                <div className='text'>
                                <h5>{item?.senderName}</h5>
                                    <p>{item?.sn}</p>
                                    <p>{item?.paymentStatus}</p>
                            
                                </div>
                                <div className='options'>
                                    <h5><AmountFormatter value={item?.paymentAmount} currency={item?.senderCurrency}/></h5>
                                    <h5><AmountFormatter value={item?.receivedAmount} currency={item?.beneficiaryCurrency}/></h5>
                                </div>
                                </Box>
                            </Link>
                    </>

                    ))
           
                }
             
               
            </BeneficiaryCont> */}
        </div>

        {/* <Kyc/> */}
      </Content>
    </Userlayout>
  );
}

const Content = styled.div`
  width: 100%;
  /* background-color: #fff; */
  padding-inline: 1em;
  margin: 0 auto;
  height: 100%;
  @media screen and (max-width: 40em) {
    width: 90%;
  }
`;
const BeneficiaryCont = styled.div`
  overflow-y: scroll;
  padding-inline: 1em;
  /* border: 1px solid red; */
  height: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .head {
    width: 80%;
    /* padding: 1em; */
    margin: 0 auto;
  }

  .box {
    padding-inline: 3em;
    background-color: #fff;
    padding: 1.2em;
    border-radius: 8px;
    display: flex;
    gap: 20px;
    width: 80%;
    /* border: 0.3px solid green; */
    margin: 0 auto;
    width: 90%;

    @media screen and (max-width: 40em) {
      width: 100%;
    }

    .text {
      display: inline-flex;
      flex-direction: column;
      /* gap: 4px; */
      letter-spacing: 1;
      font-size: 12;
      flex: 1;
    }
    .options {
      text-align: end;
      height: 100%;
      font-size: 12px;
    }

    /* .arco-icon-more-vertical{
        display: none;
    }
     */
  }
`;
const Box = styled.div`
  align-items: center;
  display: flex;
  gap: 14px;
  justify-content: space-around;
  width: 100%;
  /* padding-inline: 1em; */
  /* @media screen and (min-width: 90em){
        display: mone;
    } */
  .av {
    background: rgba(0, 168, 90, 1);

    /* width: 50%;
        height: 50%; */
  }
`;
export default Wallet;
