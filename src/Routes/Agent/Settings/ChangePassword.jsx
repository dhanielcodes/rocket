import { useState } from "react";
import Agentlayout from "../../../reuseables/AgentLayout";
import Centeredbox from "../../../reuseables/Centeredbox";
import Box from "../../../reuseables/Box";
import TextInput from "../../../styles/TextInput";
import CountryDropdown from "../../../reuseables/CountryList";
import Btn from "../../../reuseables/Btn";
import visible from "../../../assets/view.png";
import hide from "../../../assets/hide.png";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../../../services/Auth";
import toast from "react-hot-toast";
const ChangePassord = () => {
  const [old, setOld] = useState("");
  const [newP, setNewP] = useState("");
  const [type, setType] = useState(false);
  const [type2, setType2] = useState(false);
  const Userdata = JSON.parse(localStorage.getItem("userDetails"));

  const togglePass = (set, it) => {
    set(!it);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: updatePassword,
    onSuccess: (data) => {
      console.log(data);
      if (data?.status) {
        toast.success(data?.message + " - " + data?.transactionRef);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (data) => {
      console.log(data);
      toast.error(data?.message);
    },
  });
  return (
    <Agentlayout useBack={true} current="Update Password">
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
                onChange={(e) => {
                  setOld(e.target.value);
                }}
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
                  onClick={() => {
                    togglePass(setType, type);
                  }}
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
                type={type2 ? "text" : "password"}
                onChange={(e) => {
                  setNewP(e.target.value);
                }}
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
                  src={type2 ? visible : hide}
                  height="20px"
                  onClick={() => {
                    togglePass(setType2, type2);
                  }}
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
          clicking={() => {
            if (old && newP && confirm)
              mutate({
                userId: Userdata?.data?.user?.userId,
                oldPassword: old,
                password: newP,
              });
          }}
          styles={{
            width: "100%",
          }}
        >
          {isLoading ? "saving..." : "Save Changes"}
        </Btn>
      </Centeredbox>
    </Agentlayout>
  );
};

export default ChangePassord;
