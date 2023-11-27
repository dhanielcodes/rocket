import React, { useEffect, useState } from "react";
import SumsubWebSdk from "@sumsub/websdk-react";
import { useQuery } from "@tanstack/react-query";
import { GetToken } from "../services/Auth";
import { styled } from "styled-components";

export default function Kyc() {
  const applicantEmail = "saheedalbert@gmail.com";
  const applicantPhone = "08089828929";
  const [accessT, setAccessT] = useState("");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["8230145"],
    queryFn: GetToken,
    onSuccess: (data) => {
      setAccessT(data?.data?.token);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  useEffect(() => {
    if (!isLoading && data?.data?.token) {
      setAccessT(data.data.token);
    }
  }, [isLoading, data]);

  return (
    <Content>
      <div className="app">
        {
          accessT && (

            <SumsubWebSdk
              accessToken={accessT.toString()}
              updateAccessToken={(callback) => {
                // Call your backend API to get a new access token
                // fetch('https://api.sumsub.com/resources/sdkIntegrations/websdkInit')
                //   .then((response) => response.json())
                //   .then((data) => {
                //     callback(data.accessToken); // Update the access token
                //   })
                //   .catch((error) => {
                //     console.error('Error fetching new access token:', error);
                //   });
              }}
              expirationHandler={(e) => {
                console.log(e);
              }}
              // Rest of your SumsubWebSdk props...
            />
          )
        }
      </div>
    </Content>
  );
}



const Content = styled.div`
    background-color: #fff;
    height: 100vh;
    overflow-y: scroll;

    .app{
        height: 100%;
        overflow-y: scroll;

        .body{
            height: 100vh;
            overflow-y: scroll;
        }
    }

`