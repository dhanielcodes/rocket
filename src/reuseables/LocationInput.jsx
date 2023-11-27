import { Input } from "@arco-design/web-react";
import { useEffect, useState } from "react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import styled, { keyframes } from "styled-components";

export const LocationInput = ({ className, setAddress, address, onClick }) => {
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: "AIzaSyD-_l9nxSDNe8aCG5iBVYjREj-R1DFyg2I",
  });

  const [places, savePlaceDetailsToState] = useState();
  useEffect(() => {
    // fetch place details for the first element in placePredictions array
    if (placePredictions.length)
      placesService?.getDetails(
        {
          placeId: placePredictions[0].place_id,
        },
        (placeDetails) => savePlaceDetailsToState(placeDetails)
      );
  }, [placePredictions]);

  return (
    <>
      <Input
        placeholder="Street Address"
        onChange={(evt) => {
          getPlacePredictions({ input: evt });
        }}
        className={className}
      />
      <div
        style={{
          position: "absolute",
          top: "114%",
          background: "white",
          zIndex: "1000",
          borderRadius: "10px",
          border: "1px solid #d5d5d5",
        }}
      >
        {isPlacePredictionsLoading && <Spinner />}
        {(placePredictions?.length &&
          placePredictions?.map((item) => {
            return (
              <div
                key={item}
                style={{
                  cursor: "pointer",
                  borderBottom: "1px solid #d5d5d5",
                  padding: "10px",
                }}
                onClick={() => {
                  setAddress(item);
                  onClick();
                  console.log(address);
                }}
              >
                {item?.description}
              </div>
            );
          })) ||
          ""}
      </div>
    </>
  );
};

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  margin: 4px;

  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  border-left: 2px solid #16d760;
  background: transparent;
  width: 14px;
  height: 14px;
  border-radius: 50%;
`;
