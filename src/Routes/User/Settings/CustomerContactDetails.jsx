import React, { useState } from "react";
import Userlayout from "../../../reuseables/Userlayout";
import styled from "styled-components";
import Centeredbox from "../../../reuseables/Centeredbox";
import Box from "../../../reuseables/Box";
import TextInput from "../../../styles/TextInput";
import { InputStyle } from "../../../styles/Input";
import { Input } from "@arco-design/web-react";
import Btn from "../../../reuseables/Btn";

const CustomerContactDetails = () => {
  const [countryDetails, setCountryDetails] = useState({
    regionId: 1,
    subRegionId: 3,
    telephoneCode: "234",
    currencyCode: "NGN",
    emoji: "??",
    status: false,
    id: 161,
    name: "Nigeria",
    longitude: "8",
    latitude: "10",
  });
  const [createBene, setCreateBene] = useState({
    userId: "",
    userBeneficiary: {
      country: {
        id: countryDetails?.id,
      },
      beneficiaryBank: {
        bankId: 1,
      },
    },

    // userId: 100,
    // userBeneficiary: {
    //     beneficiaryName: nameEnq?.data?.account_name,
    //     beneficiaryPhoneNumber: nameenquiry?.phone,
    //     beneficiaryBank: {
    //         accountNumber: accNum,
    //         bankId: nameenquiry?.bank_id
    //     }
    // }
  });
  return (
    <Userlayout useBack={true}>
      <Centeredbox>
        <Box radius="15px" width="100%" flexDirection="column">
          <TextInput label="Email Address" placehlder="teting" />

          <InputStyle>
            <p style={{ paddingBlock: "10px" }}>Phone Number</p>
            <Input
              name="phone"
              addBefore={countryDetails?.telephoneCode}
              className="input"
              style={{
                borderRadius: "8px",
                height: "42px",
                padding: "5px",
                border: "0.2px solid grey",
              }}
              placeholder="+44 000-000-0000"
              onChange={(e) =>
                setCreateBene((prev) => {
                  return {
                    // userId: "",
                    userBeneficiary: {
                      beneficiaryName: prev?.userBeneficiary?.beneficiaryName,
                      beneficiaryPhoneNumber: e,
                      beneficiaryBank: {
                        accountNumber: "",
                        bankId: "",
                      },
                    },
                  };
                })
              }
            />
          </InputStyle>
        </Box>

        <Btn
          styles={{
            width: "100%",
          }}
        >
          Save Changes
        </Btn>
      </Centeredbox>
    </Userlayout>
  );
};

export default CustomerContactDetails;
