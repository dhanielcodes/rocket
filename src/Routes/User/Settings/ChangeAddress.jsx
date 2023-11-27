import { useState } from "react";
import Userlayout from "../../../reuseables/Userlayout";
import Centeredbox from "../../../reuseables/Centeredbox";
import Box from "../../../reuseables/Box";
import TextInput from "../../../styles/TextInput";
import CountryDropdown from "../../../reuseables/CountryList";
import Btn from "../../../reuseables/Btn";

const ChangeAddress = () => {
  const [selectedCountry, setSelectedCountry] = useState();

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };
  return (
    <Userlayout useBack={true}>
      <Centeredbox>
        <Box radius="15px" width="100%" flexDirection="column">
          <TextInput label="House Number" placehlder="teting" />
          <br />

          <TextInput label="Street" placehlder="teting" />
          <br />

          <TextInput label="Address 2" placehlder="teting" />
          <br />

          <TextInput label="City" placehlder="teting" />
          <br />

          <TextInput label="Postal Code" placehlder="teting" />
          <br />
          <div
            style={{
              borderRadius: "10px",
            }}
          >
            <label htmlFor="html">Country</label>

            <CountryDropdown
              value={selectedCountry}
              onChange={handleCountryChange}
            />
          </div>
        </Box>
        {/*  <button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: "10px",
            background: "rgba(0, 168, 90, 1)",
            border: "none",
            padding: "14px",
            marginTop: "10px",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Save Changes
        </button> */}

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

export default ChangeAddress;
