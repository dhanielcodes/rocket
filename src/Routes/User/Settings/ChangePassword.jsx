import { useState } from "react";
import Userlayout from "../../../reuseables/Userlayout";
import Centeredbox from "../../../reuseables/Centeredbox";
import Box from "../../../reuseables/Box";
import TextInput from "../../../styles/TextInput";
import CountryDropdown from "../../../reuseables/CountryList";
import Btn from "../../../reuseables/Btn";
import visible from "../../../assets/view.png";
import hide from "../../../assets/hide.png";
const ChangePassord = () => {
  const [selectedCountry, setSelectedCountry] = useState();

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  const [type, setType] = useState(true);

  const togglePass = () => {
    setType(!type);
  };
  return (
    <Userlayout useBack={true}>
      <Centeredbox>
        <Box radius="15px" width="100%" flexDirection="column">
          <div>
            <span>Old Password</span>
            {/* <InputStyle > */}
            {/* <Input.Password style={{ width: '100%' }} className="input" defaultValue='' onChange={handleChange} name='password' placeholder='Enter your password' /> */}
            {/* </InputStyle > */}
            <div
              style={{
                position: "relative",
              }}
            >
              <input
                name="password"
                type={type ? "text" : "password"}
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "inherit",
                  lineHeight: 1,
                  border: "1px solid #D0D5DD",
                  borderRadius: "6px",
                  color: "#000",
                  fontWeight: 300,
                }}
              />
              <div
                className="visibility"
                style={{
                  position: "absolute",
                  right: "10px",
                  bottom: "50%",
                  transform: "translateY(60%)",
                }}
              >
                <img
                  src={type ? visible : hide}
                  height="20px"
                  onClick={togglePass}
                />
              </div>
            </div>
          </div>
          <br />
          <div>
            <span>New Password</span>
            {/* <InputStyle > */}
            {/* <Input.Password style={{ width: '100%' }} className="input" defaultValue='' onChange={handleChange} name='password' placeholder='Enter your password' /> */}
            {/* </InputStyle > */}
            <div
              style={{
                position: "relative",
              }}
            >
              <input
                name="password"
                type={type ? "text" : "password"}
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "inherit",
                  lineHeight: 1,
                  border: "1px solid #D0D5DD",
                  borderRadius: "6px",
                  color: "#000",
                  fontWeight: 300,
                }}
              />
              <div
                className="visibility"
                style={{
                  position: "absolute",
                  right: "10px",
                  bottom: "50%",
                  transform: "translateY(60%)",
                }}
              >
                <img
                  src={type ? visible : hide}
                  height="20px"
                  onClick={togglePass}
                />
              </div>
            </div>
          </div>
          <br />
          <div>
            <span>Confirm Password</span>
            {/* <InputStyle > */}
            {/* <Input.Password style={{ width: '100%' }} className="input" defaultValue='' onChange={handleChange} name='password' placeholder='Enter your password' /> */}
            {/* </InputStyle > */}
            <div
              style={{
                position: "relative",
              }}
            >
              <input
                name="password"
                type={type ? "text" : "password"}
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "inherit",
                  lineHeight: 1,
                  border: "1px solid #D0D5DD",
                  borderRadius: "6px",
                  color: "#000",
                  fontWeight: 300,
                }}
              />
              <div
                className="visibility"
                style={{
                  position: "absolute",
                  right: "10px",
                  bottom: "50%",
                  transform: "translateY(60%)",
                }}
              >
                <img
                  src={type ? visible : hide}
                  height="20px"
                  onClick={togglePass}
                />
              </div>
            </div>
          </div>
          <br />
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

export default ChangePassord;
