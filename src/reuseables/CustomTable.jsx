import { Table } from "@arco-design/web-react";
import styled from "styled-components";

const CustomTable = ({
  Apidata,
  tableColumns,
  loading,
  noData,
  scroll = {
    x: 300,
    y: 600,
  },
}) => {
  const columns = [
    {
      title: "MIN AMT",
      dataIndex: "minimumAmount",
      width: "130%",
    },
    {
      title: "MAX AMT",
      dataIndex: "maximuAmount",
      width: "130%",
    },
    {
      title: "RATE",
      width: "100%",
      dataIndex: "rate",
    },
    {
      title: "FEE",
      dataIndex: "charge",
      width: "100%",
    },
    {
      title: "ACTION",
      dataIndex: "salary",
      width: "100%",
      render: () => (
        <svg
          style={{ cursor: "pointer" }}
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.334 2.49955C11.5091 2.32445 11.7169 2.18556 11.9457 2.0908C12.1745 1.99604 12.4197 1.94727 12.6673 1.94727C12.9149 1.94727 13.1601 1.99604 13.3889 2.0908C13.6177 2.18556 13.8256 2.32445 14.0007 2.49955C14.1757 2.67465 14.3146 2.88252 14.4094 3.11129C14.5042 3.34006 14.5529 3.58526 14.5529 3.83288C14.5529 4.08051 14.5042 4.3257 14.4094 4.55448C14.3146 4.78325 14.1757 4.99112 14.0007 5.16622L5.00065 14.1662L1.33398 15.1662L2.33398 11.4995L11.334 2.49955Z"
            stroke="#464F60"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];
  return (
    <Content>
      <Table
        noDataElement={noData}
        columns={tableColumns || columns}
        data={Apidata || []}
        className="table3"
        onChange={(pagination, changedSorter) => {
          console.log(changedSorter);
        }}
        pagination={false}
        style={{
          padding: "12px 0",
        }}
        scroll={scroll}
      />
    </Content>
  );
};

export default CustomTable;
const Content = styled.div`
  padding-top: 20px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  font-weight: 800;

  .table3 {
    th {
      span {
        color: #757575 !important;
        font-weight: 900 !important;
      }
      background-color: #f9fafb;
      padding: 0px;
      font-size: 12px;
    }
    td {
      padding: 20px;
      font-size: 12px;
      color: #000;
      font-weight: 800;
      span {
        color: #000 !important;
        font-weight: 800 !important;
        display: block;
      }
    }
  }
`;
