import { useMutation } from "@tanstack/react-query";
import React from "react";
import { uploadFile } from "../services/Auth";
import toast from "react-hot-toast";
import MDeleteIcon from "../assets/MDeleteIcon";
import styled from "styled-components";

const Spinner = styled.div`
  border: 4px solid rgba(0, 168, 90, 1);
  border-top: 4px #a6a6a6 solid;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  animation: spin 2s linear infinite;
  position: absolute;
  top: 30%;
  left: 45%;
  /* 
  border: 16px solid #f3f3f3; 
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite; */

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function FileUpload({
  value,
  setValue,
  className,
  placeholder = "Click to upload",
  setLoading,
}) {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const { mutate, isLoading } = useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      setLoading(false);
      if (data?.status === false) {
        toast.error(data?.message);
      } else {
        console.log(data);
        toast.success("Image Uploaded");
        setValue(data);
      }
    },
    onError: (data) => {
      //setModal(true);
      toast.error("Request wasn't created");
      setLoading(false);
      setTimeout(() => {
        //  seterr("")
      }, 2000);
      return;
    },
  });

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
      }}
    >
      {isLoading && <Spinner />}

      {!value ? (
        <label
          for="name"
          style={{
            width: "100%",
            border: "1px dashed #9d9d9d",
            padding: "20px",
            borderRadius: "20px",
            opacity: isLoading && 0,
            transition: "all 0.4s",
            display: "block",
          }}
        >
          <div className="flex flex-col items-center align-center justify-center">
            <svg
              width="46"
              height="46"
              viewBox="0 0 46 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="3" y="3" width="40" height="40" rx="20" fill="#F2F4F7" />
              <g clip-path="url(#clip0_494_16447)">
                <path
                  d="M26.3335 26.3332L23.0002 22.9999M23.0002 22.9999L19.6669 26.3332M23.0002 22.9999V30.4999M29.9919 28.3249C30.8047 27.8818 31.4467 27.1806 31.8168 26.3321C32.1868 25.4835 32.2637 24.5359 32.0354 23.6388C31.807 22.7417 31.2865 21.9462 30.5558 21.3778C29.8251 20.8094 28.9259 20.5005 28.0002 20.4999H26.9502C26.698 19.5243 26.2278 18.6185 25.5752 17.8507C24.9225 17.0829 24.1042 16.4731 23.182 16.0671C22.2597 15.661 21.2573 15.4694 20.2503 15.5065C19.2433 15.5436 18.2578 15.8085 17.3679 16.2813C16.4779 16.7541 15.7068 17.4225 15.1124 18.2362C14.518 19.05 14.1158 19.9879 13.936 20.9794C13.7563 21.9709 13.8036 22.9903 14.0746 23.961C14.3455 24.9316 14.8329 25.8281 15.5002 26.5832"
                  stroke="#475467"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <rect
                x="3"
                y="3"
                width="40"
                height="40"
                rx="20"
                stroke="#F9FAFB"
                stroke-width="6"
                stroke-linecap="round"
              />
              <defs>
                <clipPath id="clip0_494_16447">
                  <rect
                    width="20"
                    height="20"
                    fill="white"
                    transform="translate(13 13)"
                  />
                </clipPath>
              </defs>
            </svg>
            <div className="text-center">
              <div className="text-[#667085] my-2">
                <span className="text-primary200">{placeholder}</span>
              </div>
            </div>
          </div>
          <input
            disabled={isLoading}
            id="name"
            name="name"
            className="hidden"
            style={{
              display: "none",
            }}
            type="file"
            onChange={(e) => {
              const formData = new FormData();
              formData.append("file", e.target.files[0]);
              setLoading(true);
              mutate({ file: formData, id: userDetails?.data?.user?.userId });
            }}
            placeholder="placeholder"
            accept=".jpeg, .png, jpg"
          />
        </label>
      ) : (
        <div
          style={{
            textAlign: "center",
          }}
        >
          <img
            style={{
              width: "130px",
            }}
            src={value?.secure_url}
          />
          <div>
            <MDeleteIcon
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                setValue();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
