/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import Userlayout from "../../reuseables/Userlayout";
import { styled } from "styled-components";
import { Avatar, Typography } from "@arco-design/web-react";
import Checktrnx from "../../images/checktnx.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Tranx,
  TranxId,
  confirmPayment,
  getCompanyBanks,
} from "../../services/Dashboard";
import moment from "moment";
import AmountFormatter from "../../reuseables/AmountFormatter";
import Btn from "../../reuseables/Btn";
import ReusableModal from "../../reuseables/ReusableModal";
import Msg from "../../reuseables/Msg";
import CustomTable from "../../reuseables/CustomTable";
import ReactCountryFlag from "react-country-flag";
import Agentlayout from "../../reuseables/AgentLayout";
import CurrencyFlagImage from "react-currency-flags";

function OurBanksAgent() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["getCompanyBanks"],
    queryFn: () => getCompanyBanks(),
  });

  console.log(data?.data);
  const columns = [
    {
      title: "BANK NAME",
      dataIndex: "bankName",
      width: 130,
      //render: () => "Other 2",
    },

    {
      title: "ACCOUNT NAME",
      dataIndex: "accountName",
      width: 145,
      //render: () => "Other 2",
    },
    {
      title: "CURRENCY NAME",
      dataIndex: "sending",
      width: 145,
      //render: () => "Other 2",
    },
    {
      title: "ACCOUNT NUMBER",
      width: 120,
      dataIndex: "accountNumber",
    },
    {
      title: "SORT CODE",
      width: 130,
      dataIndex: "sortCode",
    },
  ];

  const [selected, setSelected] = useState();
  const newData = data?.data?.map((item) => {
    return {
      ...item,

      sending: (
        <div
          style={{
            alignItems: "center",
          }}
        >
          <CurrencyFlagImage
            currency={item?.currency?.code}
            style={{
              borderRadius: "999px",
              border: "1px solid #919191",
              width: "16px",
              height: "16px",
            }}
            size="sm"
          />
          <div>{item?.currency["name"]}</div>
        </div>
      ),
    };
  });
  return (
    <Agentlayout current="Our Banks" useBack={true}>
      <Content>
        <CustomTable
          noData={newData?.length}
          Apidata={newData || []}
          tableColumns={columns}
          loading={isLoading || isFetching}
          scroll={{
            x: 600,
            y: 400,
          }}
        />
      </Content>
    </Agentlayout>
  );
}

const Content = styled.div`
  width: 100%;
  /* background-color: #fff; */
  padding-inline: 1em;
  margin: 0 auto;
  height: 100%;
  overflow: hidden;

  @media screen and (max-width: 40em) {
    width: 100%;
  }

  .cont {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* width: 100%;
        border: 1px solid green;
         margin: 0 auto; */
  }
`;

export default OurBanksAgent;
